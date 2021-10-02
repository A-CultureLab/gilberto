import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { postComments_postComments } from '../../graphql/__generated__/postComments'
import { PostDetailContext } from '.'
import PostCommentCard from '../../components/cards/PostCommentCard'

const PostDetailCommentCard: React.FC<postComments_postComments> = (props) => {

    const { navigate } = useNavigation()
    const { refetch } = useContext(PostDetailContext)

    const { id, postReplyCommentCount, recentPostReplyComments } = props

    return (
        <>
            <PostCommentCard
                onDeleted={() => refetch()}
                data={props}
            />
            {recentPostReplyComments.map(v => (
                <PostCommentCard
                    key={v.id}
                    isReply
                    onDeleted={() => refetch()}
                    data={v}
                />
            ))}
            {postReplyCommentCount > 3 &&
                <Pressable
                    onPress={() => navigate("PostCommentDetail", { id })}
                >
                    <Text style={styles.moreReplyComment}  >답글 더보기 {postReplyCommentCount}</Text>
                </Pressable>
            }
        </>
    )
}

export default PostDetailCommentCard

const styles = StyleSheet.create({
    moreReplyComment: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 24,
        marginLeft: 68,
        marginTop: -16
    }
})