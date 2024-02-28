"use client"

import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale } from 'chart.js/auto';
import { Dashboard, Components, Files, Inbox, Calendar } from '@/svg/index.ts'

const AdminDashboard = () => {
  Chart.register(LinearScale, CategoryScale);

  type SidebarItem = {
    title: string;
    icon: JSX.Element;
  };

  //list of sidebar items
  const sidebarItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      icon: <Dashboard />
    },
    {
      title: 'Components',
      icon: <Components />
    },
    {
      title: 'Inbox',
      icon: <Inbox />
    },
    {
      title: 'Calendar',
      icon: <Calendar />
    },
    {
      title: 'Files',
      icon: <Files />
    },
  ]

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, id) => (
              <li key={id}>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                  {item.icon}
                  <span className="ms-3">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="relative flex flex-col flex-1 overflow-hidden">
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200  border-dashed rounded-lg mt-14">
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
