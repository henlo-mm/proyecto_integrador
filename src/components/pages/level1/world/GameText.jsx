import { Center, Text } from "@react-three/drei";

const GameText = (props) => {
    return (
        <Center
            position={props.position}
        >
            <Text color="black" fontSize={0.5}  rotation={props.rotation}>
                {props.text}
            </Text>
        </Center>
    );
};


export default GameText;