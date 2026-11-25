import {useState} from 'react';

function TaskForm() {

    const initialForm = {
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        status: ''
    };
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setForm(previousForm => ({
            ...previousForm,
            [name] : value
        }));

        setErrors(previousErrors => ({
            ...previousErrors,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if(!form.title.trim()){
            newErrors.title = 'Title is Required';
        }

        if(!form.description){
            newErrors.description = 'Description is Required';
        }

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateForm();

        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

        console.log("Submitted form:", form);

        setForm(initialForm);
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h2> Add Task</h2>
                
                <div>
                    <label>Title </label>
                    <input name="title" type="text" value={form.title} onChange={handleChange} />
                    { errors.title && (
                        <p>{errors.title}</p>
                    )}
                </div>
                <div>
                    <label>Description </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Priority </label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div>
                    <label>Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Completed </label>
                    <input
                        type="checkbox"
                        name="completed"
                        value={form.completed}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit"> Add Task </button>
            </div>
        </form>
    );
}

export default TaskForm;