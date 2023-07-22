# AWS EC2

태그: AWS
업로드완료: No

네트워크를 공부하다 배운 LoadBalancer의 학습을 위해 AWS EC2 + ELB

실습 환경을 구축중이다.

![image](https://github.com/JUNOSHON/experss-elb/assets/67476544/15940923-d3ae-492d-b209-e52230e5aeca)

간단한 Express 서버를 EC2에 올려 배포하려고 했다.

검색해서 얻은 정보대로 ec2 인스턴스에서 프로젝트 레포지터리의 git 주소를 clone해서 ec2에서 npm run dev를 하려고 했다.

레포지터리 주소를 ssh 키로 clone해오려고 하니 ec2 인스턴스에서 오류가 났다.

아마 git 계정의 ssh키와 ec2 인스턴스의 ssh키가 달라서 그런거라 생각하고 https주소로 쓰려고 했더니 https 는 보안을 위한 각종 인증 방법들이 필요했고 토큰 생성, git 초기 설정등을 ec2 인스턴스에서 다시 하긴 귀찮아서 자문을 구했다.

![Untitled](AWS%20EC2%20d59adac18304467ca447fb05915fc36a/Untitled%201.png)

보통 ec2에 코드를 다운받으려면

```cpp
1. scp로 로컬에서 ec2로 파일을 보낸다.
2. CI/CD를 구축한다.
```

인데 2번은 지금 할게 아니니 1번으로 하려고 했다.

자문을 구한 선배는 Spring을 쓰는데, 자바 jar 파일이 소프트웨어를 배포하기 위한 파일 포맷이라고 한다.

React 로 S3 배포할 때 build 폴더와 유사한 것 같다.

검색해 봤는데,

React 빌드 파일은 html,css,js 의 정적인 파일들이라 빌드 파일을 보내도 되지만 express는 node.js 환경 위에서 동작하는 거라서 프로젝트 전체 코드가 필요한 것 같았다.

그래서 처음 찾아본대로 clone을 했던 것 같았고, 나는 일단 scp 로 파일들을 전송하려고 했다.

![image](https://github.com/JUNOSHON/experss-elb/assets/67476544/5550e884-dbc9-487b-9b99-a463d202362f)

처음엔 선배가 보내준 대로 해봤는데, 이게 나중에 보니 거하게 틀린거였다.

AMI라고 아마존 인스턴스를 시작할 때 필요한 정보를 제공하는 이미지가 있는데, 게임으로 치면 스킬 매크로를 지정해 놓는 것 처럼 내가 앞으로 인스턴스를 생성할 때 어떤 OS를 사용할지, 어떤 보안 그룹을 사용할지 레시피 형태로 만들어놓는거다.

난 여기서 Ubuntu를 선택했고, 선배는 Amazon Linux 를 선택했다.

따라서 EC2 인스턴스의 ssh에 접근할 때 기본 username 이 달랐다.

![image](https://github.com/JUNOSHON/experss-elb/assets/67476544/820fb018-7893-4fcb-80e8-5ae3c44a7f9f)
이게 달라서 계속 ssh 접근할때 타임아웃이 났었다.

또한 ec2 ip를 입력해야 하는데 퍼블릭 주소를 안쓰고 프라이빗 주소를 써서 또 에러가 났다.

username과 IP 주소룰 정상 입력해 scp -i 로 package.json 을 전송했는데 잘 전송 됐다.

![image](https://github.com/JUNOSHON/experss-elb/assets/67476544/6c40d580-973c-406a-8b65-e936d85a3f29)

이제 scp -r 명령어로 express 프로젝트 폴더를 통째로 EC2로 전송해 서버를 실행시키려고 하는데,

![image](https://github.com/JUNOSHON/experss-elb/assets/67476544/36b6cf47-a54c-4ca6-9222-15c14827e635)

위 사진처럼 Permission denied가 났다.

찾아보니 여러 이유가 있지만 ssh 인증과 관련된 문제일 확률이 높다고 한다.

EC2 를 생성할 때 키를 ed25519 와 RSA 암호화 방식을 사용하는 방법을 선택할 때 나는 RSA 를 선택했다.

난 로컬에서 RSA를 한 적이 없긴 한데, ssh키젠할때 RSA로 한것같기도 하고,, 그래서 혹시 몰라서 vi 사용법을 검색하며 원격지의 sshd_config 폴더에 들어가 공개키 인증 옵션을 봤는데 주석 처리 되어있다.

![image](https://github.com/JUNOSHON/experss-elb/assets/67476544/00c9555f-e15b-4f9e-bb1e-8ee68c8e6112)

로컬 역시 주석처리되어있으니 공개키 인증을 하지 않는다는 것 같은데,,,

EC2 배포를 하면서 아직 해결되지 않은 궁금증은 아래와 같다.

- scp -i로 단일 파일을 전송할 땐 잘 되던게 scp -r로 디렉토리를 업로드할 때는 왜 접근이 제한되는가? 로컬과 원격 둘 다 공개키 인증 방식을 사용하지 않는데 왜 pub 키를 사용한 인증을 수행하는가?
- node.js 기반 애플리케이션의 경우 github 에서 레포지터리를 pull 혹은 clone 하는게 옳은가? scp로 프로젝트 폴더를 전송하는게 옳은가?
- ec2 가 그냥 컴퓨터 하나를 새로 받는거라면, git이나 에디터를 따로 설정해줘야 하는건가?
