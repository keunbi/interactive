(() => {    

    let yOffset = 0; //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
    // 현재 pageOffsetY값이 prevScrollHeight보다 큰지를 체크해 현재활성화된 currentScene를 구할것임
    let enterNewScene = false; //새로운 씬이 되는순간 true로 변경됨

    //구간에 대한 정보 객체로 담음 (정보를 담고있는 배열 만들기)
    const sceneInfo = [ 
        {   
            //0
            type:'sticky',
            heightNum: 5, 
            // 브라우저 높이의 5배로 scrollHeight 세팅(각 디바이스의 높이 측정해서 높이 지정하기 위해)
            // 먼저 각 디바이스가 가진 높이를 읽어와서 곱해주려고
            scrollHeight : 0, 
            //각 구간의 스크롤 높이 
            //직접 숫자를 넣을 수 있지만 디바이스 사이즈 변경에도 대응하기 때문에 함수로 처리함
            objs : { // 안에 또 객체 만들기
                container : document.querySelector('#scroll-section-0'),
                messageA : document.querySelector('#scroll-section-0 .main-message.a'),
                messageB : document.querySelector('#scroll-section-0 .main-message.b'),
                messageC : document.querySelector('#scroll-section-0 .main-message.c'),
                messageD : document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                //시작값, 끝값, 객체로 애니메이션이 시작되는 구간넣어줌
                // 시작되는 구간은 비율로 계산해서 소수점으로 넣어줌 (구간 전체를 1로봄)
                // 10% ~20% 구간에 나옴 이런식.
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
				messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]

            }
            
        },
        {   
            //1
            type:'normal',
            heightNum: 5, 
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-1')
            }
        },
        {   
            //2
            type:'sticky',
            heightNum: 5, 
            scrollHeight : 0,
            objs : {
                container: document.querySelector('#scroll-section-2'),
				messageA: document.querySelector('#scroll-section-2 .a'),
				messageB: document.querySelector('#scroll-section-2 .b'),
				messageC: document.querySelector('#scroll-section-2 .c'),
				pinB: document.querySelector('#scroll-section-2 .b .pin'),
				pinC: document.querySelector('#scroll-section-2 .c .pin'),
            },
            values: {
				messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
				messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
				messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
				messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
				messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
				messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
				messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
				pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
				pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
				pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
				pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
			}
        },
        {   
            //3
            type:'sticky',
            //heightNum: 5, type normal에서는 필요없음
            scrollHeight : 0,
            objs : {
                container : document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout(){
        // 각 스크롤 섹션의 높이 세팅
        for(let i = 0; i <sceneInfo.length; i++){
            if(sceneInfo[i].type == 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //window.innerHeight : 브라우저창의 높이
            }else if(sceneInfo[i].type == 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height=`${sceneInfo[i].scrollHeight}px` //각 섹션에 높이값을 적용해줌
        }        

        //current씬 세팅
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for(let i= 0; i < sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset){
                //totalScrollHeight가 현재스크롤위치보다 크거나같을때 for문 멈춤
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
    }



    function calcValues(values,currentYOffset){ 
        //values : 값 변화의 시작값,끝값 배열
        let rv;

        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        //현재씬에서 스크롤된 범위를 비율로 구하기
        //현재씬 안에서의 스크롤값 / 현재씬 전체 높이
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight; 

        //rv = scrollRatio * (values[1] - values[0]) + values[0];
        //구체적인 구간 없이 현재씬의 처음~끝 전체에서 적용 
        //parseInt로 정수처리해줌
        //values[1] - values[0] : 변하는 값의 범위
        //values[0] 더해줘서 처음시작값을 맞춰줌

        if(values.length ===3){ //지정한 구간이 있는경우
            //start ~ end 사이에 애니메이션 실행

            //지정한시작점비율 * 현재씬 전체 높이
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){ //범위 안에 들어왔으면
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }else if(currentYOffset < partScrollStart){
                rv = values[0]; //시작점 전에 있을때 초기값으로 고정
            }else if(currentYOffset > partScrollEnd){
                rv = values[1]; //스크롤값이 범위를 벗어나면 최종값으로 고정
            }
            
        }else{
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        


        return rv; //return값이 있어야 계산된 결과값으로 가져다써야하므로 

    }


    //애니메이션이 구현되는 함수
    function playAnimation(){   
        const objs = sceneInfo[currentScene].objs; //DOM 객체들
        const values = sceneInfo[currentScene].values; //값에 해당하는 것들
        const currentYOffset = yOffset - prevScrollHeight; // 현재 씬에서 얼마나 스크롤 되었는지
        // currentYOffset = 현재스크롤위치값 - 이전섹션들의 합

        const scrollHeight = sceneInfo[currentScene].scrollHeight
        //현재 씬의 scrollHeight(현재 씬 전체 높이)

        const scrollRatio = currentYOffset / scrollHeight;
        // 현재씬에서 스크롤 된 비율

        //console.log(currentScene,currentYOffset);

        switch (currentScene){
            case 0: //첫번째 씬
                if(scrollRatio <= 0.22){
                    //in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in,currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                }else{
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out,currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
                
				if (scrollRatio <= 0.42) {
					// in
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
					objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.62) {
					// in
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
					objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
				}

				if (scrollRatio <= 0.82) {
					// in
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
				} else {
					// out
					objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
					objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
				}

				break;
                
                case 2:
                    if (scrollRatio <= 0.25) {
                        // in
                        objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                        objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                    } else {
                        // out
                        objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                        objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                    }
    
                    if (scrollRatio <= 0.57) {
                        // in
                        objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                        objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                        objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                    } else {
                        // out
                        objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                        objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                        objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                    }
    
                    if (scrollRatio <= 0.83) {
                        // in
                        objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                        objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                        objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                    } else {
                        // out
                        objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                        objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                        objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                    }
    
                    break;
    
            case 3:
                break;
        }
    }


    //스크롤 하면 실행될 함수
    function scrollLoop(){  
        enterNewScene = false; //스크롤할때 기본적으로 false넣고 바뀌는순간 true로 변경
        prevScrollHeight = 0; // 스크롤 될 때 값이 누적되지 않도록 초기화 해주기위해
        
        for(let i = 0; i < currentScene; i++){   
            //prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
        // 현재스크롤값 > 이전섹션높이 + 현재섹션높이
            enterNewScene = true;
            currentScene ++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if(yOffset < prevScrollHeight){ 
        // 현재스크롤값 < 이전센션높이
            enterNewScene = true;
            if(currentScene ===0) return; 
            //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일) 종료함.
            currentScene --;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }

        if(enterNewScene) return; //true면 함수종료. 이상한 값들어갔을땐 playAnimation() 안되도록.(바뀔때 음수나오는 오류잡기위해)
        playAnimation();
    }

    window.addEventListener('resize',setLayout); //창 크기 바뀌면 바뀌도록
    window.addEventListener('load',setLayout);
    //window.addEventListener('DOMContentLoaded',setLayout);
    //차이는 load는 웹페이지 이미지,리소스까지 로딩된후 실행 
    //DOM은 html객체 돔구조만 로드가 끝나면 실행됨. 이미지들은 로드 안됐더라도-> 그러므로 실행시점이 더 빠름
    window.addEventListener('scroll',() => {    
        yOffset = window.pageYOffset; //현재 스크롤 위치
        scrollLoop();
    })
    
})();