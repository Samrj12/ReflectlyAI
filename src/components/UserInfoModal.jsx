import { useState } from "react";
import faceImg from "../assets/frame.png"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { motion } from "motion/react";
const UserInfoModal = ({ onSubmit }) => {

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [step, setStep] = useState(1); // Track step

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("preferred-name");
    const jobDescription = formData.get("job-description");
    if(onSubmit) {
      onSubmit(name, jobDescription);
    }
    setIsModalOpen(false);
  };

  return (
    <Dialog className="relative z-50" open={isModalOpen} onClose={() => {}}>
      <DialogBackdrop className="fixed inset-0 bg-gray-950/90" />
      <div className="fixed inset-0 flex items-center justify-center ">
        <DialogPanel className="bg-lime-950 border border-lime-500/70 rounded-b-lg max-w-lg w-full mx-auto shadow-[0_0_20px] shadow-lime-400/50">
           <DialogTitle
            as="h2"
            className="text-lg py-4 px-10 text-center border-b bg-gray-950 border-lime-500/40 font-bold leading-6 text-lime-500"
          >
            {step === 1
              ? "Camera Framing Tips"
              : step === 2
              ? "Setup Instructions"
              : "Interview Information"}
          </DialogTitle>
          {step === 1 && (
            <motion.div className="px-10 pb-6 pt-4 text-lime-500 space-y-4" 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut"}}>
              <p>
                Before we begin the interview, ensure your camera is framed correctly for the interview!
              </p>
              <img
                src={faceImg}
                alt="Ideal framing example"
                className="rounded-md h-60 w-60 mx-auto mask-x-from-95% mask-x-to-100% mask-y-from-95% mask-y-to-100%"
              />
              <p className="mb-0">
                <strong className="text-lime-400">Tip:</strong> Make sure your face and hands are clearly visible in the camera frame—a centered, well-lit head-and-shoulders view with some hand gestures helps project confidence.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-lime-500 text-gray-900 rounded-md font-semibold cursor-pointer"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div className="px-10 pb-6 pt-4 text-lime-300 space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <ul className="list-disc list-inside space-y-1">
                <li>Use a working microphone with clear audio.</li>
                <li>Select the correct webcam in browser settings.</li>
                <li>Close other tabs using your mic or camera.</li>
              </ul>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 bg-lime-500 text-gray-900 rounded-md font-semibold cursor-pointer"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="mt-4 px-10 pb-6">
              <label
                htmlFor="preferred-name"
                className="block mb-2 text-base font-medium text-lime-500"
              >
                Preferred Name <span className="font-bold">*</span>
              </label>
              <input
                type="text"
                id="preferred-name"
                name="preferred-name"
                className="bg-gray-900 border border-lime-400/30 text-lime-400 text-md rounded-md focus:outline-none focus:ring focus:ring-lime-400/70 block w-full p-2.5"
                placeholder="E.g. Alex"
                required
              />

              <label
                htmlFor="job-description"
                className="block mt-4 mb-2 text-base font-medium text-lime-500"
              >
                Job Description <span className="font-bold">(Optional)</span>
              </label>
              <input
                type="text"
                id="job-description"
                name="job-description"
                className="bg-gray-900 border border-lime-400/30 text-lime-400 text-md rounded-md focus:outline-none focus:ring focus:ring-lime-400/70 block w-full p-2.5"
                placeholder="E.g. Software Engineer. Skills: React, Node.js, Python"
              />

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-lime-500 text-lime-300 rounded-md font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-semibold text-gray-900 bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UserInfoModal;
