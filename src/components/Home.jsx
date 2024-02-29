import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [bottom, setBottom] = useState("50%");
  const bottomResizeRef = useRef(null);

  const [left, setLeft] = useState("50%");
  const leftResizeRef = useRef(null);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", bottom);
  };

  const handleDrag = (event) => {
    const newBottom = `${(event.clientY / window.innerHeight) * 100}%`;
    setBottom(newBottom);
  };

  const handleDragEnd = (event) => {
    // const initialBottom = event.dataTransfer.getData("text/plain");
    const newBottom = `${(event.clientY / window.innerHeight) * 100}%`;

    localStorage.setItem("bottomPosition", newBottom);
    setBottom(newBottom);
  };

  const handleLeftDragStart = (event) => {
    event.dataTransfer.setData("text/plain", left);
  };

  const handleLeftDrag = (event) => {
    const newLeft = `${(event.clientX / window.innerWidth) * 100}%`;
    console.log(left);
    setLeft(newLeft);
  };

  const handleLeftDragEnd = (event) => {
    // const initialLeft = event.dataTransfer.getData("text/plain");
    const newLeft = `${(event.clientX / window.innerWidth) * 100}%`;

    localStorage.setItem("leftPosition", newLeft);
    setLeft(newLeft);
  };

  useEffect(() => {
    const persistedBottom = localStorage.getItem("bottomPosition");
    if (persistedBottom) {
      setBottom(persistedBottom);
    }

    const persistedLeft = localStorage.getItem("leftPosition");
    if (persistedLeft) {
      setLeft(persistedLeft);
    }
  }, []);

  const styles = {
    main: {
      background: "#121212",
      height: "100vh",
      width: "100vw",
      position: "relative",
      color: "white",
      overflowY: "scroll",
      overflowX: "hidden",
    },
    top: {
      height: bottom,
      width: "100vw",
      display: "flex",
    },
    bottomResize: {
      background: "white",
      height: "10px",
      width: "100vw",
      position: "absolute",
      top: bottom,
      cursor: "n-resize",
    },
    left: {
      width: left,
      overflowY: "scroll",
      padding: "2px",
    },
    right: {
      marginLeft: "50px",
      overflowY: "scroll",
      width: 100 - left.split("%")[0] + "vw",
    },
    leftResize: {
      background: "white",
      height: bottom,
      width: "10px",
      position: "absolute",
      left: left,
      top: 0,
      cursor: "e-resize",
    },
    bottom: {
      marginTop: "20px",
      padding: "10px",
      overflowY: "scroll",
    },
  };

  return (
    <div className="main" style={styles.main}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%",
          zIndex: 10,
        }}
      >
        <button
          style={{ height: "30px", borderRadius: "6px", fontSize: "1.2rem" }}
        >
          <Link to={"/task2"}>2nd Task</Link>
        </button>
      </div>
      <div className="top" style={styles.top}>
        <div className="left" style={styles.left}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
          repellendus veritatis repudiandae aliquid accusamus laboriosam
          pariatur ratione, totam eaque. Ullam, tenetur? Architecto molestias
          labore molestiae reiciendis? Quam eum nostrum qui debitis nulla in
          ratione ipsum, hic corporis ad rem exercitationem veritatis, itaque
          iure sit totam accusantium reprehenderit voluptates odit nisi iusto
          rerum ab. Quidem animi rem amet ipsam. Cum nulla dolor error iusto
          nostrum excepturi aperiam dignissimos, ad sunt minima numquam quia
          praesentium. Aspernatur cupiditate iste sed ipsa illum sint
          exercitationem facilis aperiam dolorem dolore doloribus maiores eaque,
          enim sunt quisquam qui eligendi quod repudiandae veritatis
          necessitatibus laborum dolor! A voluptatem hic sint, ea at cumque
          deserunt excepturi asperiores earum. Quod fugit ipsa, veritatis vel
          cumque tenetur harum esse perspiciatis? Commodi, corporis saepe.
        </div>
        <div
          className="leftResize"
          style={styles.leftResize}
          ref={leftResizeRef}
          onDragStart={handleLeftDragStart}
          onDrag={handleLeftDrag}
          onDragEnd={handleLeftDragEnd}
          draggable
        />
        <div className="right" style={styles.right}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
          repellendus veritatis repudiandae aliquid accusamus laboriosam
          pariatur ratione, totam eaque. Ullam, tenetur? Architecto molestias
          labore molestiae reiciendis? Quam eum nostrum qui debitis nulla in
          ratione ipsum, hic corporis ad rem exercitationem veritatis, itaque
          iure sit totam accusantium reprehenderit voluptates odit nisi iusto
          rerum ab. Quidem animi rem amet ipsam. Cum nulla dolor error iusto
          nostrum excepturi aperiam dignissimos, ad sunt minima numquam quia
          praesentium. Aspernatur cupiditate iste sed ipsa illum sint
          exercitationem facilis aperiam dolorem dolore doloribus maiores eaque,
          enim sunt quisquam qui eligendi quod repudiandae veritatis
          necessitatibus laborum dolor! A voluptatem hic sint, ea at cumque
          deserunt excepturi asperiores earum. Quod fugit ipsa, veritatis vel
          cumque tenetur harum esse perspiciatis? Commodi, corporis saepe.
        </div>
        <div
          className="bottomResize"
          style={styles.bottomResize}
          ref={bottomResizeRef}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          draggable
        />
      </div>
      <div className="bottom" style={styles.bottom}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas
        repellendus veritatis repudiandae aliquid accusamus laboriosam pariatur
        ratione, totam eaque. Ullam, tenetur? Architecto molestias labore
        molestiae reiciendis? Quam eum nostrum qui debitis nulla in ratione
        ipsum, hic corporis ad rem exercitationem veritatis, itaque iure sit
        totam accusantium reprehenderit voluptates odit nisi iusto rerum ab.
        Quidem animi rem amet ipsam. Cum nulla dolor error iusto nostrum
        excepturi aperiam dignissimos, ad sunt minima numquam quia praesentium.
        Aspernatur cupiditate iste sed ipsa illum sint exercitationem facilis
        aperiam dolorem dolore doloribus maiores eaque, enim sunt quisquam qui
        eligendi quod repudiandae veritatis necessitatibus laborum dolor! A
        voluptatem hic sint, ea at cumque deserunt excepturi asperiores earum.
        Quod fugit ipsa, veritatis vel cumque tenetur harum esse perspiciatis?
        Commodi, corporis saepe.
      </div>
    </div>
  );
};

export default Home;
