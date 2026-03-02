// eslint-disable-next-line no-irregular-whitespace
// Your task: Rewrite WindowWidth as a function component using useState for width and useEffect to add the resize listener in the effect and remove it in the cleanup (return a function from useEffect that calls removeEventListener). Use the same UI so behavior stays the same.
// class WindowWidth extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       width: typeof window !== "undefined" ? window.innerWidth : 0
//     };
//     this.handleResize = this.handleResize.bind(this);
//   }

//   handleResize() {
//     this.setState({ width: window.innerWidth });
//   }

//   componentDidMount() {
//     window.addEventListener("resize", this.handleResize);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("resize", this.handleResize);
//   }

//   render() {
//     return (
//       <div>
//         <p>Window width: <strong>{this.state.width}px</strong></p>
//         <small>Resize the window to see it update. Unmount to remove the listener.</small>
//       </div>
//     );
//   }
// }
import { useEffect, useState } from "react";

export default function WindowWidth() {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

    useEffect(() => {
        function handleSize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleSize);
        return () => {
            window.removeEventListener("resize", handleSize);
            console.log("listner removed");
        };
    }, []);

    return (
        <>
            <div>
                <p>
                    Window width: <strong>{width}px</strong>
                </p>
                <small>
                    Resize the window to see it update. Unmount to remove the listener.
                </small>
            </div>
        </>
    );
}
