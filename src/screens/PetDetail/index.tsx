import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import UserFooter from '../../components/footers/UserFooter'
import Header from '../../components/headers/Header'
import ScreenLayout from '../../components/layout/ScreenLayout'
import { COLOR1, GRAY1, GRAY3, STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import { usePet } from '../../graphql/pet'
import genderGenerator from '../../lib/genderGenerator'

interface PetDetailProps {
    id: string
}

const PetDetail = () => {

    const { params: { id } } = useRoute<Route<'PetDetail', PetDetailProps>>()
    const { navigate } = useNavigation()

    const { data, loading } = usePet({ variables: { id } })

    const pet = data?.pet

    return (
        <ScreenLayout translucent >
            <StatusBar barStyle='light-content' />
            {/* Body */}
            {pet &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                >
                    <Pressable onPress={() =>
                        navigate('ImageDetail', {
                            urls: [pet.image],
                            index: 0
                        })}
                    >
                        <FastImage style={styles.image} source={{ uri: pet.image }} />
                    </Pressable>
                    {/* 이름, 종, 성격 */}
                    <View style={styles.titleCotnainer} >
                        <Text style={styles.name} >{pet.name}<Text style={styles.species} >· {pet.species}</Text></Text>
                        <Text style={styles.character} >{pet.character}</Text>
                    </View>
                    {/* 펫 세부 정보 */}
                    <View style={styles.petInfoContainer} >
                        <View style={styles.petInfoItem} >
                            <Text style={styles.petInfoLabel} >성별</Text>
                            <Text style={styles.petInfo} >{genderGenerator.pet(pet.gender)}</Text>
                        </View>
                        <View style={styles.petInfoItem} >
                            <Text style={styles.petInfoLabel} >나이</Text>
                            <Text style={styles.petInfo} >{pet.age}</Text>
                        </View>
                        <View style={styles.petInfoItem} >
                            <Text style={styles.petInfoLabel} >무게</Text>
                            <Text style={styles.petInfo} >{pet.weight}kg</Text>
                        </View>
                        <View style={styles.petInfoItem} >
                            <Text style={styles.petInfoLabel} >중성화</Text>
                            <Text style={styles.petInfo} >{pet.neutered ? 'O' : 'X'}</Text>
                        </View>
                        <View style={styles.petInfoItem} >
                            <Text style={styles.petInfoLabel} >예방접종</Text>
                            <Text style={styles.petInfo} >{pet.vaccinated ? 'O' : 'X'}</Text>
                        </View>
                    </View>
                    {/* 가족 */}
                    <View >
                        <Text style={styles.familyTitle} >가족</Text>
                        <ScrollView
                            style={styles.familyScrollView}
                            horizontal
                            contentContainerStyle={{ alignItems: 'center' }}
                            overScrollMode='never'
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={{ width: 8 }} />
                            <Pressable onPress={() => navigate('UserDetail', { id: pet.user.id })} >
                                <FastImage
                                    source={{ uri: pet.user.image }}
                                    style={styles.familyImage}
                                />
                            </Pressable>
                            {pet.user.pets.length !== 1 && <View style={styles.familyLine} />}
                            {pet.user.pets.filter(v => v.id !== id).map(v => (
                                <Pressable onPress={() => navigate('PetDetail', { id: v.id })} >
                                    <FastImage
                                        key={v.id}
                                        source={{ uri: v.image }}
                                        style={styles.familyImage}
                                    />
                                </Pressable>
                            ))}
                            <View style={{ width: 8 }} />
                        </ScrollView>
                    </View>
                </ScrollView>
            }
            {/* Header */}
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}
                style={styles.headerContainer}
            >
                <Header
                    backBtnColor='#fff'
                    backBtn='right'
                    underline={false}
                    style={{ marginTop: STATUSBAR_HEIGHT }}
                />
            </LinearGradient>
            {/* Footer */}
            {data && <UserFooter
                user={data.pet.user}
            />}
        </ScreenLayout>
    )
}

export default PetDetail

const styles = StyleSheet.create({
    headerContainer: {
        height: 56 + STATUSBAR_HEIGHT,
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: 99
    },
    image: {
        width: WIDTH,
        height: WIDTH,
    },
    titleCotnainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        borderBottomColor: GRAY3,
        borderBottomWidth: 1
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    species: {
        fontSize: 18,
        color: GRAY1
    },
    character: {
        marginTop: 8,
        fontWeight: 'bold',
        color: COLOR1
    },
    petInfoContainer: {
        borderBottomWidth: 1,
        borderBottomColor: GRAY3,
        flexDirection: 'row',
        alignItems: 'center',
        height: 104
    },
    petInfoItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    petInfoLabel: {
        color: GRAY1
    },
    petInfo: {
        marginTop: 16
    },
    familyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 24,
    },
    familyScrollView: {
        height: 72 + 24 + 24
    },
    familyImage: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginHorizontal: 8
    },
    familyLine: {
        height: 32,
        width: 1,
        backgroundColor: GRAY3,
        marginHorizontal: 8
    }
})
