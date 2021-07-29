# 38°
Mobile application


# Environment
- node 12

# GraphQL
타입추론 + 타입세이프한 Graphql사용을 위한 가이드
1. VSC에 Apollo Extension [설치](https://www.apollographql.com/docs/devtools/editor-plugins/) (gql 자동완성)
```
cmd + shift + p & Apollo: Reload schema
```
2. gql 기반 타입생성
```
npm run gql
```

# Troubleshooting
### Subscription 인증
Firebase Auth의 Accesstoken 주기는 1분이므로 1분마다 subscription을 reconnect해주어야 한다. 다만 정확한 솔루션이 아직 없는 것으로 보임. 현재는 이부분만 인증없이 사용중.
2021년 7월 29일 기준으로 아직 우리 서비스에 적합한 솔루션은 없는듯하다...
https://github.com/apollographql/subscriptions-transport-ws/issues/171
# Keyhash
```
DEBUG-MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
DEBUG-SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
DEBUG-SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
DEBUG-KEYHASH=Xo8WBi6jzSxKDVR4drqm84yr9iU=

RELEASE-MD5=3B:62:48:4F:D3:32:A5:7B:C1:30:68:3A:AC:CD:79:92
RELEASE-SHA1=A3:73:26:FF:36:C9:93:2E:36:59:FD:74:52:48:FC:CC:1D:46:A3:1A
RELEASE-SHA-256=F5:91:1A:A0:98:5E:36:5B:54:36:01:BA:BE:3D:96:CA:38:4C:BF:51:3C:D5:46:D4:74:9F:CD:CD:ED:B9:31:94
RELEASE-KEYHASH=o3Mm/zbJky42Wf10Ukj8zB1Goxo=
```

# .env
```
APOLLO_KEY=Apollo Studio Key (VSC Apollo Extension 용으로 사용됨)
```


# TODO
+ firebase messaging
+ invertase react native apple autnetication
+ appcenter
+ rn rate