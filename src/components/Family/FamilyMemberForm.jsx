import { useEffect, useState } from 'react';

function FamilyMemberForm({onMemberAdded,editingMember,onCancelEdit,handleMemberSubmit}) {
    // const [name, setName] = useState('');
    // const [relationship, setRelationship] = useState('');
    // const [gender, setGender] = useState('');
    
    const initialForm = {
        name: '',
        relationship: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        notes: ''
    };
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingMember) {
            setForm({
                name: editingMember.name,
                relationship: editingMember.relationship,
                dateOfBirth: editingMember.dateOfBirth || '',
                gender: editingMember.gender,
                email: editingMember.email,
                phone: editingMember.phone,
                notes: editingMember.notes
            });
        } else {
            setForm(initialForm);
        }
    }, [editingMember]);

    // This is called a Destructuring and is equal to 
    //const name = event.target.name;
    //const value = event.target.value;
    
    const handleChange = (event) => {

        const {name, value} = event.target;
        
        //To preserve the existing properties of the state object while changing one property- previousForm
        setForm(previousForm => ({
            ...previousForm,
            // [event.target.name]: event.target.value
            [name] : value
        }));

        // This one is to retain the existing error messages along with the new one
        setErrors(previousErrors => ({
            ...previousErrors,
            [name]: ''
        }));
        
    };

    const validateForm = () => {
        const newErrors = {};

        if(!form.name.trim()){
            newErrors.name = 'Name is Required';
        }

        if(!form.relationship){
            newErrors.relationship = 'Relationship is Required';
        }

        if(!form.dateOfBirth) {
            newErrors.dateOfBirth = 'Date fo Birth is required';
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateForm();

        if(Object.keys(validationErrors).length > 0){
            // To set the error for the given form inputs
            setErrors(validationErrors);
            return;
        }

        //console.log("Submitted form:", form);
        onSubmit(form);
        // After submitting the form reset/refresh all the form inputs and errors
        setForm(initialForm);
        setErrors({});

        //Callback function to the App.jsx(parent) to send the newly added member
        onMemberAdded(form);
    };

    return (
        <form onSubmit={handleMemberSubmit}>
            <div>
                <h2> Add Family Member</h2>
                
                <div>
                    <label>Name </label>
                    <input name="name" type="text" value={form.name} onChange={handleChange} />
                    { errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Relationship </label>
                    <select
                        name="relationship"
                        value={form.relationship}
                        onChange={handleChange}
                    >
                        <option value="">Select relationship</option>
                        <option value="Parent">Parent</option>
                        <option value="Partner">Partner</option>
                        <option value="Child">Child</option>
                        <option value="Other">Other</option>
                    </select>
                    { errors.relationship && (
                        <p>{errors.relationship}</p>
                    )}
                </div>
                <div>
                    <label>Gender </label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                    />
                    { errors.dateOfBirth && (
                        <p>{errors.dateOfBirth}</p>
                    )}
                </div>

                <div>
                    <label>Email </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Phone </label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Notes </label>
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">
                {editingMember ? 'Update Member' : 'Add Member'}
                </button>
                <button
                    type="button"
                    onClick={onCancelEdit}
                >
                Cancel
                </button>
            </div>
        </form>
    );
}

export default FamilyMemberForm;