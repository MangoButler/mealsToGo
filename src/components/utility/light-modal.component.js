import React from "react";
import { Modal, Portal } from "react-native-paper";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { ModalContainer, Backdrop } from "./utility.styles";

// const ModalContainer = styled.View`
//   background-color: ${(props) => props.theme.colors.bg.primary};
//   padding: ${(props) => props.theme.space[3]};
//   /* margin: ${(props) => props.theme.space[3]}; */
//   border-radius: 8px;
//   width: 50%;
// `;

// const FullscreenCenter = styled.View`
//   /* flex: 1; */
//   justify-content: center;
//   align-items: center;
// `;

// const FilterModal = ({ visible, onDismiss, children }) => {
//   return (
//     <Portal>
//       <Modal
//         visible={visible}
//         onDismiss={onDismiss}
//         contentContainerStyle={{
//           justifyContent: "center",
//           alignItems: "center",
//           //   flex: 1,
//         }}
//       >
//         {/* <FullscreenCenter> */}
//         <ModalContainer>{children}</ModalContainer>
//         {/* </FullscreenCenter> */}
//       </Modal>
//     </Portal>
//   );
// };

// export default FilterModal;

// const FilterModal = ({ visible, onDismiss, children }) => {
//   return (
//     <Portal>
//       <Modal
//         visible={visible}
//         dismissable={false}
//         contentContainerStyle={{ flex: 1 }}
//       >
//         <TouchableWithoutFeedback onPress={onDismiss}>
//           <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//           >
//             <TouchableWithoutFeedback onPress={() => {}}>
//               <ModalContainer>{children}</ModalContainer>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </Portal>
//   );
// };

// export default FilterModal;

const LightModal = ({ visible, onDismiss, children, zValue = 100 }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={onDismiss}>
          <Backdrop>
            <TouchableWithoutFeedback onPress={() => {}}>
              <ModalContainer zValue={zValue}>{children}</ModalContainer>
            </TouchableWithoutFeedback>
          </Backdrop>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  );
};

export default LightModal;
