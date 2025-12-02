import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
  close: () => void;
};

export default function Modal({ title, children, close }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-7 w-[420px] relative scale-in border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          {title}
        </h2>

        {children}

        {/* Boton cerrar */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
          aria-label="Cerrar modal"
        >
          x
        </button>
      </div>
    </div>
  );
}
