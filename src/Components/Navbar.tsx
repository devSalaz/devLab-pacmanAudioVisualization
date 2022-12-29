import { splitText } from "../Utils/SplitText";
import { FaLinkedin } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

interface NavbarProps {
  onHandleVisible: () => void;
  isVisible: boolean;
}

const Navbar = ({ onHandleVisible, isVisible }: NavbarProps) => {
  const onHideButtonClicked = () => {
    onHandleVisible();
  };

  return (
    <header>
      <nav>
        <a
          href="https://twitter.com/DevSalaz"
          target="_blank"
          className="logoTittle"
        >
          {splitText("devAndres")}
        </a>
        <div className="buttons-container">
          <button className="btn-hide" onClick={onHideButtonClicked}>
            {isVisible ? "Hide Content" : "Show Content"}
            <span className="hide-bg">
              {isVisible ? (
                <AiFillEyeInvisible size="1.25rem" />
              ) : (
                <AiFillEye size="1.25rem" />
              )}
            </span>
          </button>
          <a href="https://www.linkedin.com/in/andres-salaz/" target="_blank">
            <button className="btn-contact">
              Contact Me{" "}
              <span className="contact-bg">
                <FaLinkedin size="1.2rem" />
              </span>
            </button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
