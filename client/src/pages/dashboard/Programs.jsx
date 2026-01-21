import { useEffect, useState } from "react";
import "../../styles/programs.css";
import { getPrograms, selectProgram } from "../../api/programApi";

export default function Programs() {
    const [programs, setPrograms] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPrograms();
    }, []);

    const loadPrograms = async () => {
        try {
            const res = await getPrograms();
            setPrograms(res.data.data);
        } catch (err) {
            console.log("Failed to load programs");
        }
    };

    const chooseProgram = async (id) => {
        try {
            setLoading(true);
            await selectProgram(id);
            setSelected(id);
            alert("Program activated");
        } catch (err) {
            console.log(err.response?.data || err.message);
            alert(err.response?.data?.message || "Failed to activate program");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="programs-page">

            <h1>Your Fitness Programs</h1>
            <p className="program-sub">
                Select a program to personalize your workouts, diet, and AI coach.
            </p>

            <div className="program-grid">
                {programs.map((p) => (
                    <div
                        key={p._id}
                        className={`program-card ${selected === p._id ? "active" : ""}`}
                    >
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>

                        <ul>
                            {p.focus?.map((f, i) => (
                                <li key={i}>✔ {f}</li>
                            ))}
                        </ul>

                        <button
                            disabled={loading}
                            onClick={() => chooseProgram(p._id)}
                        >
                            {selected === p._id ? "Activated" : "Activate Program"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}