import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import EmployeeRepository from "../../repositories/EmployeeRepository";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import person from "./person.png";
import "./Employee.css";
import { resourceUsage } from "process";
import { userInfo } from "os";

export default ({ employee }) => {
  const [animalCount, setCount] = useState(0);
  const [location, markLocation] = useState({ name: "" });
  const [classes, defineClasses] = useState("card employee");
  const { employeeId } = useParams();
  const { getCurrentUser } = useSimpleAuth();
  const { resolveResource, resource } = useResourceResolver();

  const history = useHistory()

  useEffect(() => {
    if (employeeId) {
      defineClasses("card employee--single");
    }
    resolveResource(employee, employeeId, EmployeeRepository.get);
  }, []);

    const fireEmployee = () => {
        const updatedEmployee = {
            "id": employeeId,
            "name": resource.name,
            "email": resource.email,
            "employee": false
        }

        fetch(`http://localhost:8088/users/${resource.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEmployee)
        })
        .then(history.go("/employees"))
        
    }

    useEffect(() => {
      if (resource?.employeeLocations?.length > 0) {
        markLocation(resource.employeeLocations[0]);
      }
    }, [resource]);

    return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? resource.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${resource.id}`,
                                    state: { employee: resource }
                                }}>
                                {resource.name}
                            </Link>

                    }
                </h5>
                {
                    employeeId
                        ? <>
                            <section>
                                Caring for {resource.animals?.length} animals
                            </section>
                            <section>
                                Locations: {resource.locations?.map(location => location.location.name).join(", ")}
                            </section>
                        </>
                        : ""
                }

                {
                    <button className="btn--fireEmployee"  onClick={fireEmployee}>Fire</button>
                }
            </section>
        </article>
        );
    };
