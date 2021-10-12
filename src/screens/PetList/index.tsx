import React, { createContext, useMemo, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PetsAdressFilterInput } from '../../../__generated__/globalTypes'
import PetCard from '../../components/cards/PetCard'
import ScreenLayout from '../../components/layout/ScreenLayout'
import TabScreenBottomTabBar from '../../components/tabs/TabScreenBottomTabBar'
import { usePets } from '../../graphql/pet'
import useRefreshing from '../../hooks/useRefreshing'
import PetListEmpty from './PetListEmpty'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PetListHeader from './PetListHeader'
import { useNavigation } from '@react-navigation/core'
import { COLOR1, DEFAULT_SHADOW } from '../../constants/styles'

interface PetListContextInterface {
    filter: PetsAdressFilterInput, setFilter: (filter: PetsAdressFilterInput) => void
    refetch: () => void
}

export const PetListContext = createContext<PetListContextInterface>({} as any)

const PetList = () => {

    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()

    const [filter, setFilter] = useState<PetsAdressFilterInput>({})

    const { data, refetch, fetchMore } = usePets({ variables: { filter } })
    const refreshing = useRefreshing(refetch)

    const contextValue = useMemo<PetListContextInterface>(() => ({
        filter, setFilter,
        refetch
    }), [filter, setFilter, refetch])

    return (
        <PetListContext.Provider value={contextValue} >
            <ScreenLayout>
                <PetListHeader />
                {data?.pets.length === 0
                    ? <PetListEmpty />
                    : <FlatList
                        {...refreshing}
                        onEndReachedThreshold={0.5}
                        onEndReached={() => fetchMore({ variables: { skip: data?.pets.length } })}
                        overScrollMode='never'
                        data={data?.pets || []}
                        ListFooterComponent={<View style={{ height: bottom + 32 + 32 + 32 }} />}
                        renderItem={({ item }) => <PetCard {...item} />}
                    />}
                <TabScreenBottomTabBar />
                <Pressable style={[styles.homeBtn, { bottom: bottom + 56 + 32 }]} onPress={() => navigate('Home')} >
                    <Icon name="location-on" size={16} color="#fff" />
                    <Text style={styles.homeBtnText} >지도보기</Text>
                </Pressable>
            </ScreenLayout>
        </PetListContext.Provider>
    )
}

export default PetList

const styles = StyleSheet.create({
    homeBtn: {
        height: 34,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR1,
        paddingHorizontal: 16,
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#fff',
        ...DEFAULT_SHADOW
    },
    homeBtnText: {
        color: '#fff',
        marginLeft: 8
    }
})


