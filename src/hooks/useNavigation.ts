import { NavigationProp, useNavigation as _useNavigation } from "@react-navigation/core";

import { NavigationParamList } from "../navigations";

const useNavigation = () => _useNavigation<NavigationProp<NavigationParamList>>()

export default useNavigation