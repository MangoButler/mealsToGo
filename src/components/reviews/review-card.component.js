import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Card, Avatar } from "react-native-paper";
import { Text } from "../typography/text.component";

const screenHeight = Dimensions.get("window").height;
const maxCardHeight = screenHeight * 0.2 + "px"; // 10% of screen height
const maxExpandedCardHeight = screenHeight * 0.3 + "px"; // 10% of screen height
const StyledCard = styled(Card)`
  margin: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  /* height: ${maxCardHeight}px; */
  /* height: ${(props) =>
    props.expanded ? maxExpandedCardHeight : maxCardHeight}; */
  background-color: ${({ theme, $secondaryBg }) =>
    $secondaryBg ? theme.colors.bg.secondary : theme.colors.bg.primary};
`;

const CardContentRow = styled(View)`
  flex-direction: row;
  /* height: 100%; */
  align-items: stretch;
`;

const ImageSection = styled(View)`
  flex: 0.4;
  justify-content: ${(props) => (props.expanded ? "center" : "flex-start")};
  align-items: stretch;
`;

const StyledImage = styled(Image)`
  width: 100%;
  /* height: 100px; */
  aspect-ratio: 1;
  align-self: ${(props) => (props.expanded ? "center" : "stretch")};

  border-top-left-radius: ${(props) =>
    props.expanded ? props.theme.space[0] : props.theme.space[2]};
  border-bottom-left-radius: ${(props) =>
    props.longComment ? props.theme.space[0] : props.theme.space[2]};
`;

const ContentSection = styled(View)`
  flex: ${({ hasImage }) => (hasImage ? "0.6" : "1")};
  padding: ${(props) => props.theme.space[3]};
  justify-content: flex-start;
`;

const HeaderRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const AuthorName = styled(Text)`
  margin-left: ${(props) => props.theme.space[2]};
  flex: 1;
  font-weight: bold;
`;

const RatingText = styled(Text)`
  font-weight: bold;
  /* color: #ffaa00; */
  color: rgb(242, 185, 70);
`;

const CommentText = styled(Text)`
  margin-top: ${(props) => props.theme.space[2]};
`;

const ToggleExpandedText = styled(Text)`
  color: ${(props) => props.theme.colors.ui.primary};
`;

export const ReviewCard = ({
  review,
  renderActions = null,
  secondaryBg = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!review?.comment) return null;

  const { comment, rating, imageUrl, user } = review;
  const [isMultiLine, setIsMultiLine] = useState(false);

  const MAX_LINES = 2;

  const isLongComment = isMultiLine || !!renderActions;

  const shouldTruncate = comment.length > 50; //120; // or use line count with trial & error

  return (
    <StyledCard
      mode="contained"
      elevation={5}
      expanded={expanded}
      $secondaryBg={secondaryBg}
    >
      <CardContentRow>
        {imageUrl && (
          <ImageSection expanded={expanded}>
            <StyledImage
              source={{ uri: imageUrl }}
              resizeMode="cover"
              longComment={isLongComment}
              expanded={expanded}
            />
          </ImageSection>
        )}

        <ContentSection hasImage={!!imageUrl}>
          <HeaderRow>
            {user?.profilePicture ? (
              <Avatar.Image size={32} source={{ uri: user.profilePicture }} />
            ) : (
              <Avatar.Text
                size={32}
                label={user?.username?.[0]?.toUpperCase() || "U"}
              />
            )}
            <AuthorName>{user?.username || "Unknown"}</AuthorName>
            <RatingText>{rating} ★</RatingText>
          </HeaderRow>

          <CommentText
            numberOfLines={expanded ? undefined : MAX_LINES}
            ellipsizeMode="tail"
            variant="hint"
            onTextLayout={(e) => {
              setIsMultiLine(e.nativeEvent.lines.length > 3);
            }}
          >
            {comment}
          </CommentText>

          {shouldTruncate && !expanded && (
            <TouchableOpacity onPress={() => setExpanded(true)}>
              <ToggleExpandedText variant="hint">Read more</ToggleExpandedText>
            </TouchableOpacity>
          )}
          {expanded && (
            <TouchableOpacity onPress={() => setExpanded(false)}>
              <ToggleExpandedText variant="hint">Read less</ToggleExpandedText>
            </TouchableOpacity>
          )}
          {/* {renderActions && renderActions(review)} */}
        </ContentSection>
      </CardContentRow>
      {renderActions && renderActions(review)}
    </StyledCard>
  );
};

// export const ReviewCard = ({ review }) => {
//   if (!review?.comment) return null;

//   const {
//     comment,
//     rating,
//     imageUrl, // optional
//     user,
//   } = review;

//   return (
//     <StyledCard mode="contained" elevation={5}>
//       <CardContentRow>
//         {imageUrl ? (
//           <ImageSection>
//             <StyledImage source={{ uri: imageUrl }} resizeMode="cover" />
//           </ImageSection>
//         ) : null}

//         <ContentSection hasImage={!!imageUrl}>
//           <HeaderRow>
//             {user?.profilePicture ? (
//               <Avatar.Image size={32} source={{ uri: user.profilePicture }} />
//             ) : (
//               <Avatar.Text
//                 size={32}
//                 label={user?.username?.[0]?.toUpperCase() || "U"}
//               />
//             )}
//             <AuthorName>{user?.username || "Unknown"}</AuthorName>
//             <RatingText>{rating} ★</RatingText>
//           </HeaderRow>
//           <CommentText numberOfLines={2} ellipsizeMode="tail" variant="hint">
//             {comment}
//           </CommentText>
//         </ContentSection>
//       </CardContentRow>
//     </StyledCard>
//   );
// };
