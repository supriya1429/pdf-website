import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        By accessing and using <strong>PDFMaster</strong>, you agree to comply
        with and be bound by these Terms and Conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Use of Service
      </h2>
      <p className="mb-4">
        Our tools are provided for lawful use only. You agree not to misuse the
        service or attempt to disrupt the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Intellectual Property
      </h2>
      <p className="mb-4">
        All content, branding, and design belong to PDFMaster unless stated
        otherwise.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Limitation of Liability
      </h2>
      <p className="mb-4">
        PDFMaster is provided "as is". We are not responsible for any loss or
        damage resulting from the use of our tools.
      </p>

      <p className="mt-6">
        Continued use of the website means you accept these terms.
      </p>
    </div>
  );
};

export default Terms;
