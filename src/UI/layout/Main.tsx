import React from 'react';

const Main: React.FC<{ children: React.ReactElement }> =
          ({children}) => {
              return (
                  <main
                      className="flex-auto flex-shrink-0 flex justify-center bg w-full overflow-hidden"
                  >
                      <div className="container px-2 sm:px-5 flex justify-center text-app-light py-5 z-[1] ">
                          {children}
                      </div>
                  </main>
              );
          }

export default React.memo(Main);