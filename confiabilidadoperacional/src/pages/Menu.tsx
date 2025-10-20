import styles from "./Menu.module.css";
import styled from "styled-components";

const Background = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
`;

export default function Menu({
  isClicked,
  setIsClicked,
}: {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
}) {
  return (
    <>
      <Background
        className={isClicked ? styles.clicked : styles.notclicked}
        onClick={() => setIsClicked(!isClicked)}
      ></Background>
    </>
  );
}
