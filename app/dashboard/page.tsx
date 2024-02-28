"use client"

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale } from 'chart.js/auto';

const AdminDashboard = () => {
  Chart.register(LinearScale, CategoryScale);

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Components</span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1 6H4a4 4 0 0 0 0 8h1.5a4.5 4.5 0 0 0 0-9ZM0 17a1 1 0 0 0 1 1h1.184A3.97 3.97 0 0 0 3 20H0v-3ZM1 9a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Calendar</span>
              </a>
            </li>

            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17 2a1 1 0 0 0-1 1v2h-2V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2H0V3A3 3 0 0 1 3 0h5a1 1 0 0 0 0-2H3a5 5 0 0 0-5 5v12a5 5 0 0 0 5 5h12a5 5 0 0 0 5-5V7a1 1 0 0 0-1-1h-1V3a1 1 0 0 0-1-1ZM5 12v4h4v-4H5Zm6 0v4h4v-4h-4Zm6 0v4h-2v-4h2Zm-6-6v4h4V6h-4Zm6 0v4h-2V6h2Zm-6-6v2h4V0h-4Zm6 0v2h-2V0h2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Files</span>
              </a>
            </li>

          </ul>
        </div>
      </aside>

      <div className="relative flex flex-col flex-1 overflow-hidden">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
            <div className='charts bg-transparent w-full'>
              <div className=" h-screen sm:h-auto flex flex-col gap-3">
                <div className='flex charts flex-col sm:flex-row gap-3'>
                  <div className='sm:w-2/3 flex gap-3 flex-col sm:flex-row'>

                    <div className='w-full border rounded-lg overflow-hidden shadow-lg'>
                      <Line
                        data={{
                          labels: ['January', 'February', 'March', 'April', 'May'],
                          datasets: [
                            {
                              label: 'Monthly Sales - Dataset 1',
                              data: [45, 79, 60, 41, 76],
                              fill: false,
                              borderColor: 'rgba(255,99,132,1)',
                            },
                            {
                              label: 'Monthly Sales - Dataset 2',
                              data: [30, 45, 75, 89, 60],
                              fill: false,
                              borderColor: 'rgba(54, 162, 235, 1)',
                            },
                          ],
                        }}
                      />
                    </div>
                    <div className='w-full border rounded-lg overflow-hidden shadow-lg'>
                      <Line
                        data={{
                          labels: ['January', 'February', 'March', 'April', 'May'],
                          datasets: [
                            {
                              label: 'Temperature - City A',
                              data: [25, 28, 30, 22, 26],
                              fill: false,
                              borderColor: 'rgba(255,99,132,1)',
                            },
                            {
                              label: 'Temperature - City B',
                              data: [22, 26, 29, 24, 27],
                              fill: false,
                              borderColor: 'rgba(54, 162, 235, 1)',
                            },
                          ],
                        }}
                      />

                    </div>
                  </div>

                  <div className='flex sm:w-1/3 flex-col sm:flex-row gap-3 justify-between'>
                    <div className='sm:w-1/2 border rounded-lg overflow-hidden shadow-lg'>
                      <Doughnut
                        data={{
                          labels: ['Red', 'Blue', 'Yellow'],
                          datasets: [
                            {
                              data: [200, 80, 150],
                              backgroundColor: ['red', 'blue', 'yellow'],
                              hoverBackgroundColor: ['darkred', 'darkblue', 'darkyellow'],
                            },
                          ],
                        }}
                      />
                    </div>
                    <div className='w-1/2 border rounded-lg overflow-hidden shadow-lg'>
                      <Doughnut
                        data={{
                          labels: ['Red', 'Blue', 'Yellow'],
                          datasets: [
                            {
                              data: [120, 30, 180],
                              backgroundColor: ['lightcoral', 'lightblue', 'lightgoldenrodyellow'],
                              hoverBackgroundColor: ['darkred', 'darkblue', 'darkyellow'],
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>


                <div className='flex flex-col sm:flex-row items-center gap-3 justify-between'>
                  <div className='sm:w-1/2 w-full border rounded-lg overflow-hidden shadow-lg'>
                    <Line
                      data={{
                        labels: ['January', 'February', 'March', 'April', 'May'],
                        datasets: [
                          {
                            label: 'Sales - Product A',
                            data: [45, 79, 60, 41, 76],
                            fill: false,
                            borderColor: 'rgba(255, 99, 132, 1)',
                          },
                          {
                            label: 'Sales - Product B',
                            data: [30, 45, 75, 89, 60],
                            fill: false,
                            borderColor: 'rgba(54, 162, 235, 1)',
                          },
                          {
                            label: 'Sales - Product C',
                            data: [65, 50, 70, 45, 80],
                            fill: false,
                            borderColor: 'rgba(75, 192, 192, 1)',
                          },
                        ],
                      }}
                    />
                  </div>
                  <div className='sm:w-1/2 w-full border rounded-lg overflow-hidden shadow-lg'>
                    <Bar
                      data={{
                        labels: ['January', 'February', 'March', 'April', 'May'],
                        datasets: [
                          {
                            label: 'Monthly Sales',
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255, 206, 86, 0.4)',
                            hoverBorderColor: 'rgba(255, 206, 86, 1)',
                            data: [60, 80, 20, 50, 70],
                          },
                        ],
                      }}
                    />
                  </div>
                </div>

                <div className='border rounded-lg overflow-hidden shadow-lg'>
                  <Bar
                    data={{
                      labels: ['January', 'February', 'March', 'April', 'May'],
                      datasets: [
                        {
                          label: 'Monthly Sales',
                          backgroundColor: 'rgba(153, 102, 255, 0.2)',
                          borderColor: 'rgba(153, 102, 255, 1)',
                          borderWidth: 1,
                          hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
                          hoverBorderColor: 'rgba(153, 102, 255, 1)',
                          data: [30, 75, 40, 65, 90],
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
