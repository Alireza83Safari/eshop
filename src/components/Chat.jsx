import {
  faCamera,
  faCircleExclamation,
  faFaceLaughWink,
  faImage,
  faMicrophone,
  faPhone,
  faPlus,
  faThumbsUp,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Chat() {
  return (
    <section className="px-6 py-4 float-right mt-20 bg-white-200 w-[87%] dark:bg-black-600">
      <div className="grid grid-cols-10 bg-white-100 dark:bg-black-200 rounded-xl dark:text-white-100">
        <div className="col-span-2 mt-6 shadow">
          <p className="flex items-center justify-center text-md p px-5 shadow h-20 font-black">
            Chat Panel
          </p>

          <div className="overflow-y-auto max-h-[73vh]">
            <div className="flex h-24 w-full px-2 shadow">
              <div className="flex items-center">
                <img
                  src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="my-auto  ml-3">
                <p className="text-sm">Reza</p>
                <p className="text-gray-500 text-xs">Lorem ipsum dolor,</p>
              </div>
            </div>
            <div className="flex h-24 w-full px-2 shadow">
              <div className="flex items-center">
                <img
                  src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="my-auto  ml-3">
                <p className="text-sm">Ali</p>
                <p className="text-gray-500 text-xs">Lorem ipsum dolor,</p>
              </div>
            </div>
            <div className="flex h-24 w-full px-2 shadow">
              <div className="flex items-center">
                <img
                  src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="my-auto  ml-3">
                <p className="text-sm">Sara</p>
                <p className="text-gray-500 text-xs">Lorem ipsum dolor,</p>
              </div>
            </div>
            <div className="flex h-24 w-full px-2 shadow">
              <div className="flex items-center">
                <img
                  src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="my-auto  ml-3">
                <p className="text-sm">Mahsa</p>
                <p className="text-gray-500 text-xs">Lorem ipsum dolor,</p>
              </div>
            </div>
            <div className="flex h-24 w-full px-2 shadow">
              <div className="flex items-center">
                <img
                  src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="my-auto  ml-3">
                <p className="text-sm">Negin</p>
                <p className="text-gray-500 text-xs">Lorem ipsum dolor,</p>
              </div>
            </div>
            <div className="flex h-24 w-full px-2 shadow">
              <div className="flex items-center">
                <img
                  src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="my-auto  ml-3">
                <p className="text-sm">Negin</p>
                <p className="text-gray-500 text-xs">Lorem ipsum dolor,</p>
              </div>
            </div>
            <div className="flex h-24 w-full px-2 shadow">
              <div className="flex items-center">
                <img
                  src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="my-auto  ml-3">
                <p className="text-sm">Negin</p>
                <p className="text-gray-500 text-xs">Lorem ipsum dolor,</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 mt-6">
          <section className="flex flex-col h-[80vh] border-gray-800">
            <div className="px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
              <div className="flex">
                <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                  <img
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                    alt=""
                  />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Scarlett Johansson</p>
                  <p>Active 1h ago</p>
                </div>
              </div>

              <div className="flex">
                <Link className="block rounded-full text-xl p-2 ml-4">
                  <FontAwesomeIcon icon={faPhone} />
                </Link>
                <Link className="block rounded-full text-xl p-2 ml-4">
                  <FontAwesomeIcon icon={faVideo} />
                </Link>
                <Link className="block rounded-full text-xl p-2 ml-4">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                </Link>
              </div>
            </div>
            <div className="chat-body p-4 flex-1 overflow-y-auto">
              <div className="flex flex-row justify-start">
                <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                  <img
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                    alt=""
                  />
                </div>
                <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                  <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-t-full rounded-r-full max-w-xs lg:max-w-md  text-black-200 bg-gray-100">
                    What is the price of the iphone 11?
                    </p>
                  </div>
                  <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-r-full max-w-xs lg:max-w-md text-black-200 bg-gray-100">
                    What is the color of the iphone 11?
                    </p>
                  </div>
                </div>
              </div>
              <p className="p-4 text-center text-sm text-gray-500">
                FRI 3:04 PM
              </p>
              <div className="flex flex-row justify-end">
                <div className="messages text-sm text-white grid grid-flow-row gap-2">
                  <div className="flex items-center flex-row-reverse group">
                    <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-600 text-white-100 max-w-xs lg:max-w-md">
                      hi how are you?
                    </p>
                  </div>
                  <div className="flex items-center flex-row-reverse group">
                    <p className="px-6 py-3 rounded-l-full bg-blue-600 text-white-100 max-w-xs lg:max-w-md">
                     799$
                    </p>
                  </div>
                  <div className="flex items-center flex-row-reverse group">
                    <p className="px-6 py-3 rounded-b-full rounded-l-full bg-blue-600 text-white-100 max-w-xs lg:max-w-md">
                      blue red gray and white
                    </p>
                  </div>
                </div>
              </div>
              <p className="p-4 text-center text-sm text-gray-500">
                SAT 2:10 PM
              </p>
              <div className="flex flex-row justify-start">
                <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
                  <img
                    className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://v3dboy.ir/previews/html/nextable/default/assets/media/image/avatar.jpg"
                    alt=""
                  />
                </div>
                <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
                  <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-t-full rounded-r-full max-w-xs lg:max-w-md text-black-200 bg-gray-100">
                    Ok thanks
                    </p>
                  </div>
                  <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-r-full max-w-xs lg:max-w-md  text-black-200 bg-gray-100">
                      Shall we go for Hiking this weekend?
                    </p>
                  </div>
                  <div className="flex items-center group">
                    <p className="px-6 py-3 rounded-b-full rounded-r-full max-w-xs lg:max-w-md text-black-200 bg-gray-100">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Volutpat lacus laoreet non curabitur gravida.
                    </p>
                  </div>
                </div>
              </div>
          
            </div>
            <div className="chat-footer flex-none">
              <div className="flex flex-row items-center p-4">
                <button
                  type="button"
                  className="flex  focus:outline-none mx-2 text-blue-600 text-xl"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  type="button"
                  className="flex  focus:outline-none mx-2 text-blue-600 text-xl"
                >
                  <FontAwesomeIcon icon={faImage} />
                </button>
                <button
                  type="button"
                  className="flex  focus:outline-none mx-2 text-blue-600 text-xl"
                >
                  <FontAwesomeIcon icon={faCamera} />
                </button>
                <button
                  type="button"
                  className="flex  focus:outline-none mx-2 text-blue-600 text-xl"
                >
                  <FontAwesomeIcon icon={faMicrophone} />
                </button>
                <div className="relative flex-grow">
                  <label>
                    <input
                      className="input-message rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                      type="text"
                      value=""
                      placeholder="Aa"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 mt-2 mr-3 text-blue-600 text-xl"
                    >
                      <FontAwesomeIcon icon={faFaceLaughWink} />
                    </button>
                  </label>
                </div>
                <button type="button" className="mx-2 text-blue-600 text-xl">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
