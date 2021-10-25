import { RouteProp, useRoute as _useRoute } from "@react-navigation/core";

import { NavigationParamList } from "../screens";

const useRoute = <RouteName extends keyof NavigationParamList>() => _useRoute<RouteProp<NavigationParamList, RouteName>>()

export default useRoute