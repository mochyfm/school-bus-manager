import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../Services/main.services";
import { Student } from "../../Types/Types";
import MessageCard from "../../Components/Cards/MessageCard/MessageCard";

const StudentPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    const getStudent = async (studentId: number) => {
      const studentData = await getStudentById(studentId);
      studentData && setStudent(studentData);
    };

    id && getStudent(parseInt(id));
  }, [id]);

  return (
    <div>
      {student &&
        student.messages &&
        student.messages.map(
          ({ client_id, student_id, message_id, message, message_type }) => {
            return (
              <MessageCard
                client_id={client_id}
                student_id={student_id}
                message_id={message_id}
                message={message}
                message_type={message_type}
              />
            );
          }
        )}
    </div>
  );
};

export default StudentPage;
