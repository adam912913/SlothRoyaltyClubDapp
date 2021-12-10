import { useState, useContext } from 'react';

const Main = () => {
    const [nameIsValid, setNameIsValid] = useState(true);
    const submissionHandler = (event) => {
        event.preventDefault();
    }
    const nameClass = nameIsValid ? "form-control" : "form-control is-invalid";
    return (
        <div className="container-fluid mt-2">
            <div className="row">
                <main role="main" className="col-lg-12 justify-content-center text-center">
                    <div className="content mr-auto ml-auto">

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Main;