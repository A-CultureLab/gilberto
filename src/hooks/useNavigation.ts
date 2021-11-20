import { useNavigation as _useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

import { NavigationParamList } from "../navigations";

const useNavigation = () => _useNavigation<StackNavigationProp<NavigationParamList>>()

export default useNavigation