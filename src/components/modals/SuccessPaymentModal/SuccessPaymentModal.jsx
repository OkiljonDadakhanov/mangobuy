import {Dialog} from "@headlessui/react";
import React from "react";

import SuccessPng from "../../../assets/ok front.png";
import Button from "../../Button/Button";

function SuccessPaymentModal({isOpen, onClose, onSubmit}) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto z-10">
        <img className="block mx-auto" src={SuccessPng} alt="" />
        <Dialog.Title className="text-center text-xl">Success</Dialog.Title>
        <Dialog.Description className="text-center">
          Payment completed <br /> successfully!
        </Dialog.Description>
        <div className="mt-6">
          {/* <button
            onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button> */}

          <Button onClick={onSubmit}>Back Home</Button>
        </div>
      </div>
    </Dialog>
  );
}

export default SuccessPaymentModal;
