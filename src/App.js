import "./styles.css";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";

const addMoreData = (setUsers) => {
  setTimeout(() => {
    setUsers((prev) => {
      const newUsers = [...prev];
      for (let i = 0; i < 4; i++) {
        newUsers.push(prev.length + i + 1);
      }
      return newUsers;
    });
  }, 2000);
};

export default function App() {
  const [users, setUsers] = useState([1, 2, 3, 4]);
  const triggerRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      () => addMoreData(setUsers),
      { threshold: 1.0 }
    );

    if (triggerRef.current) observerRef.current.observe(triggerRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <div className="App" onClick={() => addMoreData(setUsers)}>
      <div className="users">
        {users.map((u) => (
          <div key={u} className="user">
            {u}
          </div>
        ))}
        <div className="sentinal" ref={triggerRef}>
          Loading...
        </div>
      </div>
    </div>
  );
}
