"use client";

import React, { useState } from "react";

const KontaktPage = () => {
	const initialFormState = { fullname: "", email: "", phone: "", message: "" };

    //prettier-ignore
	const [formErrors, setFormErrors] = React.useState<{ fullname?: string; email?: string; phone?: string; message?: string; }>({});
    const [isDataSubmitting, setIsDataSubmitting] = React.useState(false);
	const [formData, setFormData] = React.useState(initialFormState);
	const [canDataSubmit, setCanDataSubmit] = useState(true);

    // TODO: Finsih the form validation and whole front-end logic
};

export default KontaktPage;
