import { useState } from "react";

function SimpleForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = () => {
    alert(`Name: ${name}, Age: ${age}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Form</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>

      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

export default SimpleForm;
