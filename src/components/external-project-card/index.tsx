import { useState } from 'react';
import { Fragment } from 'react';
import LazyImage from '../lazy-image';
import { ga, skeleton } from '../../utils';
import { SanitizedExternalProject } from '../../interfaces/sanitized-config';

const platformIcons = {
  android: '/images/android-logo.png',
  ios: '/images/ios-logo.png',
  windows: '/images/windows-logo.png',
  web: '/images/web-logo.png',
};

const youtubeIcon = '/images/youtube-logo.png'; // Add the YouTube icon path

const ExternalProjectCard = ({
  externalProjects,
  header,
  loading,
  googleAnalyticId,
}: {
  externalProjects: SanitizedExternalProject[];
  header: string;
  loading: boolean;
  googleAnalyticId?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 17; // Maximum number of cards per page

  // Calculate the indices for slicing the projects
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProjects = externalProjects.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(externalProjects.length / cardsPerPage);

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < cardsPerPage; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="flex items-start px-4">
                  <div className="w-full">
                    <h2>
                      {skeleton({
                        widthCls: 'w-32',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto',
                      })}
                    </h2>
                    <div className="avatar w-full h-full">
                      <div className="w-24 h-24 mask mask-squircle mx-auto">
                        {skeleton({
                          widthCls: 'w-full',
                          heightCls: 'h-full',
                          shape: '',
                        })}
                      </div>
                    </div>
                    <div className="mt-2">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto',
                      })}
                    </div>
                    <div className="mt-2 flex items-center flex-wrap justify-center">
                      {skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-4',
                        className: 'mx-auto',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderExternalProjects = () => {
    return currentProjects.map((item, index) => (
      <div
        className="card shadow-lg compact bg-base-100 cursor-pointer relative"
        key={index}
        onClick={(e) => {
          e.preventDefault();

          try {
            if (googleAnalyticId) {
              ga.event('Click External Project', {
                post: item.title,
              });
            }
          } catch (error) {
            console.error(error);
          }

          window?.open(item.link, '_blank');
        }}
      >
        <div className="p-8 h-full w-full flex flex-col justify-between">
          <div>
            <div className="text-center w-full">
              <h2 className="font-medium text-center opacity-60 mb-2">
                {item.title}
              </h2>
              {item.imageUrl && (
                <div className="avatar opacity-90">
                  <div className="w-24 h-24 mask mask-squircle">
                    <LazyImage
                      src={item.imageUrl}
                      alt={'thumbnail'}
                      placeholder={skeleton({
                        widthCls: 'w-full',
                        heightCls: 'h-full',
                        shape: '',
                      })}
                    />
                  </div>
                </div>
              )}
              <p className="mt-2 text-base-content text-opacity-60 text-sm text-justify">
                {item.description}
              </p>
            </div>
          </div>
          {/* Platform Logos */}
          <div className="flex justify-center space-x-2 mt-4">
            {item.platform?.map((platform, idx) => (
              <img
                key={idx}
                src={platformIcons[platform as keyof typeof platformIcons]}
                alt={platform}
                className="w-5 h-5"
                title={platform}
                style={{
                  filter: 'grayscale(100%)',
                  opacity: 0.45,
                }}
              />
            ))}
          </div>
        </div>
        {/* YouTube Button */}
        {item.youtubeLink && (
          <a
            href={item.youtubeLink}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-4 right-4 z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevents the card click event
          >
            <img
              src={youtubeIcon}
              alt="YouTube"
              className="w-6 h-6"
              title="Watch on YouTube"
              style={{
                filter: 'grayscale(100%)',
                opacity: 0.8,
              }}
            />
          </a>
        )}
      </div>
    ));
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="card compact bg-base-100 shadow bg-opacity-40">
              <div className="card-body">
                <div className="mx-3 flex items-center justify-between mb-2">
                  <h5 className="card-title">
                    {loading ? (
                      skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                    ) : (
                      <span className="text-base-content opacity-70">
                        {header}
                      </span>
                    )}
                  </h5>
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? renderSkeleton() : renderExternalProjects()}
                  </div>
                </div>
                {/* Pagination Buttons */}
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`btn btn-sm ${
                        currentPage === index + 1
                          ? 'btn-primary'
                          : 'btn-outline'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExternalProjectCard;
