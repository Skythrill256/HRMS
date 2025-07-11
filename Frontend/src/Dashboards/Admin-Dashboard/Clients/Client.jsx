import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addClient } from '../../../redux/slices/clientSlice.js';
import { Country, State } from 'country-state-city';

const dialCodes = {
    AF: "+93", AL: "+355", DZ: "+213", AS: "+1-684",
    AD: "+376", AO: "+244", AR: "+54", AM: "+374",
    AU: "+61", AT: "+43", AZ: "+994", BH: "+973",
    BD: "+880", BY: "+375", BE: "+32", BJ: "+229",
    BT: "+975", BO: "+591", BA: "+387", BW: "+267",
    BR: "+55", BN: "+673", BG: "+359", BF: "+226",
    BI: "+257", KH: "+855", CM: "+237", CA: "+1",
    CV: "+238", CF: "+236", TD: "+235", CL: "+56",
    CN: "+86", CO: "+57", KM: "+269", CG: "+242",
    CR: "+506", CI: "+225", HR: "+385", CU: "+53",
    CY: "+357", CZ: "+420", DK: "+45", DJ: "+253",
    DO: "+1-809", EC: "+593", EG: "+20", SV: "+503",
    GQ: "+240", ER: "+291", EE: "+372", ET: "+251",
    FJ: "+679", FI: "+358", FR: "+33", GA: "+241",
    GM: "+220", GE: "+995", DE: "+49", GH: "+233",
    GR: "+30", GT: "+502", GN: "+224", GY: "+592",
    HT: "+509", HN: "+504", HU: "+36", IS: "+354",
    IN: "+91", ID: "+62", IR: "+98", IQ: "+964",
    IE: "+353", IL: "+972", IT: "+39", JM: "+1-876",
    JP: "+81", JO: "+962", KZ: "+7", KE: "+254",
    KI: "+686", KP: "+850", KR: "+82", KW: "+965",
    KG: "+996", LA: "+856", LV: "+371", LB: "+961",
    LS: "+266", LR: "+231", LY: "+218", LT: "+370",
    LU: "+352", MG: "+261", MW: "+265", MY: "+60",
    MV: "+960", ML: "+223", MT: "+356", MH: "+692",
    MR: "+222", MU: "+230", MX: "+52", MD: "+373",
    MC: "+377", MN: "+976", ME: "+382", MA: "+212",
    MZ: "+258", MM: "+95", NA: "+264", NP: "+977",
    NL: "+31", NZ: "+64", NI: "+505", NE: "+227",
    NG: "+234", NO: "+47", OM: "+968", PK: "+92",
    PW: "+680", PA: "+507", PG: "+675", PY: "+595",
    PE: "+51", PH: "+63", PL: "+48", PT: "+351",
    QA: "+974", RO: "+40", RU: "+7", RW: "+250",
    KN: "+1-869", LC: "+1-758", VC: "+1-784", WS: "+685",
    SM: "+378", SA: "+966", SN: "+221", RS: "+381",
    SC: "+248", SL: "+232", SG: "+65", SK: "+421",
    SI: "+386", SB: "+677", SO: "+252", ZA: "+27",
    ES: "+34", LK: "+94", SD: "+249", SR: "+597",
    SE: "+46", CH: "+41", SY: "+963", TW: "+886",
    TJ: "+992", TZ: "+255", TH: "+66", TG: "+228",
    TO: "+676", TT: "+1-868", TN: "+216", TR: "+90",
    TM: "+993", UG: "+256", UA: "+380", AE: "+971",
    GB: "+44", US: "+1", UY: "+598", UZ: "+998",
    VU: "+678", VE: "+58", VN: "+84", YE: "+967",
    ZM: "+260", ZW: "+263"
};


const ClientForm = ({ setClient }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        id: '', date: '', clientName: '', companyName: '', customerType: '',
        email: '', phone: '', country: '', state: '', city: '',
        fullAddress: '', addressLine1: '', addressLine2: '', zip: '', logoUrl: '',
    });


    const [availableCountries, setAvailableCountries] = useState([]);
    const [availableStates, setAvailableStates] = useState([]);

    const customerTypes = ["Individual", "Business", "Vendor"];

    useEffect(() => {
        const counter = 1;
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const paddedCounter = String(counter).padStart(4, '0');

        const clientId = `IGCLNT${day}${month}${year}${paddedCounter}`;
        setFormData(prev => ({ ...prev, id: clientId }));

        const countries = Country.getAllCountries().map(c => ({ name: c.name, code: c.isoCode }));
        setAvailableCountries(countries);

        const today = date.toISOString().split('T')[0]; // yyyy-mm-dd

        setFormData(prev => ({
            ...prev,
            id: clientId,
            date: today,
        }));

    }, []);

    useEffect(() => {
        if (formData.country) {
            const states = State.getStatesOfCountry(formData.country).map(s => ({ name: s.name, code: s.isoCode }));
            setAvailableStates(states);
        } else {
            setAvailableStates([]);
        }
    }, [formData.country]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "country") {
            const dialCode = dialCodes[value] || "";
            setFormData(prev => ({
                ...prev,
                country: value,
                phone: dialCode ? `${dialCode} ` : ""
            }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'clientName' || name === 'companyName') {
            const nameForAvatar = value || formData.id;
            setFormData(prev => ({
                ...prev,
                logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=random&size=128`,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullAddress = `${formData.addressLine1}${formData.addressLine2 ? ', ' + formData.addressLine2 : ''}`;

        if (!formData.clientName.trim() || !formData.companyName.trim() || !formData.customerType ||
            !formData.email.trim() || !formData.phone.trim() || !formData.country ||
            !formData.state || !formData.city.trim() || !formData.addressLine1.trim() || !formData.zip.trim()) {
            toast.error('Please fill in all required fields.', { position: 'top-center', theme: "colored" });
            return;
        }

        const newClient = {
            id: formData.id,
            clientName: formData.clientName.trim(),
            companyName: formData.companyName.trim(),
            customerType: formData.customerType,
            logoUrl: formData.logoUrl,
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            altPhone: '',
            contactPersons: [],
            address: {
                country: availableCountries.find(c => c.code === formData.country)?.name || '',
                state: availableStates.find(s => s.code === formData.state)?.name || '',
                city: formData.city.trim(),
                fullAddress: fullAddress.trim(),
                zip: formData.zip.trim(),
            },
            shippingAddress: {
                headline: 'Primary Address',
                country: availableCountries.find(c => c.code === formData.country)?.name || '',
                state: availableStates.find(s => s.code === formData.state)?.name || '',
                city: formData.city.trim(),
                fullAddress: fullAddress.trim(),
                zip: formData.zip.trim(),
            },
            billing: {
                totalBilled: 0,
                totalReceived: 0,
                totalDue: 0
            },
            orders: [],
            transactions: [],
        };

        dispatch(addClient(newClient));
        toast.success('Client added successfully!', { position: 'top-center', theme: "colored" });

        const newId = `CL-${nanoid(8).toUpperCase()}`;
        setFormData({
            id: newId,
            clientName: '', companyName: '', customerType: '', email: '', phone: '',
            country: '', state: '', city: '', fullAddress: '', addressLine1: '', addressLine2: '', zip: '',
            logoUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(newId)}&background=random&size=128`,
        });
        setClient(false);
    };

    const handleCancel = () => {
        setClient(false);
        console.log("Form cancelled");
    };

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 p-6">
            <div className="dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-6xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Client Information</h2>

                <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Client ID</label>
                        <input type="text" value={formData.id} disabled className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Client Name *</label>
                        <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Client Name" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Company Name *</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Customer Type *</label>
                        <select name="customerType" value={formData.customerType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-800" required>
                            <option value="">Select Type</option>
                            {customerTypes.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Country *</label>
                        <select name="country" value={formData.country} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-800" required>
                            <option value="">Select Country</option>
                            {availableCountries.map((c, idx) => <option key={idx} value={c.code}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">State *</label>
                        <select name="state" value={formData.state} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:text-white dark:bg-gray-800" required>
                            <option value="">Select State</option>
                            {availableStates.map((s, idx) => <option key={idx} value={s.code}>{s.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">City *</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Phone No *</label>
                        <div className="flex">
                            <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 rounded-l-md text-gray-700 dark:text-white">
                                {dialCodes[formData.country] || "+__"}
                            </span>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter number" className="w-full px-3 py-2 border border-l-0 border-gray-300 rounded-r-md dark:bg-gray-800 dark:text-white" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Address Line-1 *</label>
                        <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Address Line-2</label>
                        <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2 (Optional)" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Pin Code *</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Pin Code" className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white" required />
                    </div>

                    <div className="md:col-span-3 flex justify-end mt-4 space-x-4">
                        <button type="button" className="bg-red-600 text-white px-6 py-2 rounded-md shadow hover:bg-red-700 transition-colors duration-200" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition-colors duration-200">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ClientForm;
