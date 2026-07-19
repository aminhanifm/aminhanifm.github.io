from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-image.png"
SCALE = 3
W, H = 1200, 630


def scaled(value):
    return int(round(value * SCALE))


def font_path(*names):
    candidates = [
        Path("C:/Windows/Fonts"),
        Path("/usr/share/fonts/truetype/dejavu"),
        Path("/System/Library/Fonts"),
    ]
    for folder in candidates:
        for name in names:
            path = folder / name
            if path.exists():
                return str(path)
    return None


FONT_REGULAR = font_path("segoeui.ttf", "DejaVuSans.ttf", "Helvetica.ttc")
FONT_BOLD = font_path("segoeuib.ttf", "DejaVuSans-Bold.ttf", "Helvetica.ttc")
FONT_SEMIBOLD = font_path("seguisb.ttf", "segoeuib.ttf", "DejaVuSans-Bold.ttf", "Helvetica.ttc")


def load_font(size, weight="regular"):
    path = FONT_REGULAR
    if weight == "bold":
        path = FONT_BOLD or path
    elif weight == "semibold":
        path = FONT_SEMIBOLD or FONT_BOLD or path
    if path:
        return ImageFont.truetype(path, scaled(size))
    return ImageFont.load_default()


def text_size(draw, text, font):
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def fit_font(draw, text, max_width, start_size, min_size, weight):
    for size in range(start_size, min_size - 1, -1):
        font = load_font(size, weight)
        width, _ = text_size(draw, text, font)
        if width <= scaled(max_width):
            return font
    return load_font(min_size, weight)


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    xy = tuple(scaled(v) for v in xy)
    draw.rounded_rectangle(xy, radius=scaled(radius), fill=fill, outline=outline, width=scaled(width))


def masked_rectangle(canvas, rect, fill, clip_rect, clip_radius):
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    layer_draw = ImageDraw.Draw(layer)
    layer_draw.rectangle(tuple(scaled(v) for v in rect), fill=fill)

    mask = Image.new("L", canvas.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle(tuple(scaled(v) for v in clip_rect), radius=scaled(clip_radius), fill=255)

    layer.putalpha(ImageChops.multiply(layer.getchannel("A"), mask))
    canvas.alpha_composite(layer)


def shadow_layer(size, rect, radius, blur, color):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    layer_draw = ImageDraw.Draw(layer)
    rounded_rect(layer_draw, rect, radius, color)
    return layer.filter(ImageFilter.GaussianBlur(scaled(blur)))


def cover_square(path, size, radius=0):
    img = Image.open(path).convert("RGBA")
    side = min(img.size)
    left = (img.width - side) // 2
    top = (img.height - side) // 2
    img = img.crop((left, top, left + side, top + side)).resize((scaled(size), scaled(size)), Image.Resampling.LANCZOS)

    if radius:
        mask = Image.new("L", img.size, 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle((0, 0, img.width, img.height), radius=scaled(radius), fill=255)
        img.putalpha(mask)
    return img


def draw_profile(canvas):
    photo_size = 176
    x, y = 106, 115
    photo = cover_square(ROOT / "public" / "images" / "photo.jpg", photo_size)

    border = Image.new("RGBA", (scaled(photo_size + 12), scaled(photo_size + 12)), (0, 0, 0, 0))
    mask = Image.new("L", border.size, 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse((0, 0, border.width - 1, border.height - 1), fill=255)

    border_draw = ImageDraw.Draw(border)
    border_draw.ellipse((0, 0, border.width - 1, border.height - 1), fill=(248, 250, 252, 255))
    border_draw.ellipse((scaled(5), scaled(5), border.width - scaled(6), border.height - scaled(6)), fill=(185, 142, 37, 255))
    border_draw.ellipse((scaled(10), scaled(10), border.width - scaled(11), border.height - scaled(11)), fill=(248, 250, 252, 255))

    photo_mask = Image.new("L", photo.size, 0)
    photo_mask_draw = ImageDraw.Draw(photo_mask)
    photo_mask_draw.ellipse((0, 0, photo.width - 1, photo.height - 1), fill=255)
    photo.putalpha(photo_mask)

    canvas.alpha_composite(border, (scaled(x - 6), scaled(y - 6)))
    canvas.alpha_composite(photo, (scaled(x), scaled(y)))


def draw_project_icon(canvas, path, tile_x, tile_y):
    tile = 128
    icon = 104
    padding = (tile - icon) // 2
    draw = ImageDraw.Draw(canvas)

    rounded_rect(draw, (tile_x, tile_y, tile_x + tile, tile_y + tile), 22, (18, 32, 47, 235), (43, 62, 83, 255), 1)
    inner = cover_square(path, icon, 18)
    canvas.alpha_composite(inner, (scaled(tile_x + padding), scaled(tile_y + padding)))


def build():
    canvas = Image.new("RGBA", (scaled(W), scaled(H)), (5, 12, 20, 255))
    draw = ImageDraw.Draw(canvas)

    for y in range(scaled(H)):
        t = y / scaled(H)
        r = int(5 + 14 * t)
        g = int(12 + 19 * t)
        b = int(20 + 27 * t)
        draw.line((0, y, scaled(W), y), fill=(r, g, b, 255))

    for x in range(0, W, 80):
        draw.line((scaled(x), 0, scaled(x), scaled(H)), fill=(35, 50, 66, 30), width=scaled(1))
    for y in range(0, H, 80):
        draw.line((0, scaled(y), scaled(W), scaled(y)), fill=(35, 50, 66, 26), width=scaled(1))

    canvas.alpha_composite(shadow_layer(canvas.size, (70, 70, 718, 560), 30, 18, (0, 0, 0, 110)))
    canvas.alpha_composite(shadow_layer(canvas.size, (760, 70, 1130, 560), 30, 18, (0, 0, 0, 110)))

    draw = ImageDraw.Draw(canvas)
    left_panel = (70, 70, 718, 560)
    right_panel = (760, 70, 1130, 560)
    rounded_rect(draw, left_panel, 30, (13, 24, 36, 248))
    rounded_rect(draw, right_panel, 30, (13, 24, 36, 248))
    masked_rectangle(canvas, (70, 70, 88, 560), (78, 213, 199, 255), left_panel, 30)
    draw = ImageDraw.Draw(canvas)
    rounded_rect(draw, left_panel, 30, None, (46, 68, 91, 255), 2)
    rounded_rect(draw, right_panel, 30, None, (46, 68, 91, 255), 2)

    draw_profile(canvas)

    name = "Amin Hanif"
    title = "Unity Game Developer"
    role = "Technical Initiative Lead"
    text_x = 318
    max_name_width = 718 - text_x - 44

    name_font = fit_font(draw, name, max_name_width, 64, 54, "bold")
    title_font = load_font(32, "semibold")
    role_font = load_font(27)
    body_font = load_font(30)
    body_font_2 = load_font(28)
    stat_number_font = load_font(31, "bold")
    stat_label_font = load_font(21)
    link_font = load_font(23, "semibold")

    draw.text((scaled(text_x), scaled(140)), name, fill=(248, 250, 252, 255), font=name_font)
    draw.text((scaled(text_x), scaled(220)), title, fill=(78, 213, 199, 255), font=title_font)
    draw.text((scaled(text_x), scaled(270)), role, fill=(166, 176, 191, 255), font=role_font)

    draw.text((scaled(106), scaled(356)), "Mobile, PC, web, AR, and simulation games.", fill=(224, 231, 240, 255), font=body_font)
    draw.text((scaled(106), scaled(401)), "Prototype to release.", fill=(224, 231, 240, 255), font=body_font_2)

    stats = [("7+", "Years"), ("20+", "Games"), ("10+", "Awards")]
    stat_x = 106
    stat_width = 170
    stat_gap = 14
    stat_center_y = scaled(488)
    for number, label in stats:
        rounded_rect(draw, (stat_x, 452, stat_x + stat_width, 523), 14, (20, 34, 50, 255), (48, 68, 90, 255), 1)

        number_box = draw.textbbox((0, 0), number, font=stat_number_font)
        label_box = draw.textbbox((0, 0), label, font=stat_label_font)
        number_width = number_box[2] - number_box[0]
        label_width = label_box[2] - label_box[0]
        number_height = number_box[3] - number_box[1]
        label_height = label_box[3] - label_box[1]
        row_gap = scaled(15)
        row_width = number_width + row_gap + label_width
        row_x = scaled(stat_x) + (scaled(stat_width) - row_width) // 2
        number_y = stat_center_y - number_height // 2 - number_box[1]
        label_y = stat_center_y - label_height // 2 - label_box[1]

        draw.text((row_x, number_y), number, fill=(248, 250, 252, 255), font=stat_number_font)
        draw.text((row_x + number_width + row_gap, label_y), label, fill=(169, 180, 195, 255), font=stat_label_font)
        stat_x += stat_width + stat_gap

    projects = [
        ROOT / "public" / "images" / "projects" / "heisters.webp",
        ROOT / "public" / "images" / "projects" / "ojol-life-food-delivery-game.webp",
        ROOT / "public" / "images" / "projects" / "dragon-ranch.webp",
        ROOT / "public" / "images" / "projects" / "catmelon-kitty-merge-fever.webp",
    ]
    tile_size = 128
    grid_gap_x = 24
    grid_gap_y = 32
    grid_width = tile_size * 2 + grid_gap_x
    grid_left = right_panel[0] + (right_panel[2] - right_panel[0] - grid_width) // 2
    grid_top = 116
    positions = [
        (grid_left, grid_top),
        (grid_left + tile_size + grid_gap_x, grid_top),
        (grid_left, grid_top + tile_size + grid_gap_y),
        (grid_left + tile_size + grid_gap_x, grid_top + tile_size + grid_gap_y),
    ]
    for path, pos in zip(projects, positions):
        draw_project_icon(canvas, path, *pos)

    link_text = "aminhanifm.github.io"
    link_width, _ = text_size(draw, link_text, link_font)
    link_x = scaled(right_panel[0]) + (scaled(right_panel[2] - right_panel[0]) - link_width) // 2
    draw.text((link_x, scaled(516)), link_text, fill=(78, 213, 199, 255), font=link_font)

    canvas = canvas.resize((W, H), Image.Resampling.LANCZOS).convert("RGB")
    canvas.save(OUT, optimize=True, quality=95)
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()
