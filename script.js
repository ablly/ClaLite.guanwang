// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 导航栏滚动效果
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let scrollTimer;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 防抖动处理
        clearTimeout(scrollTimer);
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        scrollTimer = setTimeout(() => {
            header.style.transition = '';
        }, 500);
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // 添加动画触发器 - 监测元素进入视口时添加动画类
    const animatedElements = document.querySelectorAll('.feature-card, .scene-card, .control-item, .tech-item, .section-title, .download-buttons, .contact-info');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 场景轮播
    const scenesSlider = document.querySelector('.scenes-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (scenesSlider && prevBtn && nextBtn) {
        const sceneCards = document.querySelectorAll('.scene-card');
        const cardWidth = sceneCards[0].offsetWidth + 32; // 加上margin
        
        prevBtn.addEventListener('click', function() {
            scenesSlider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', function() {
            scenesSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 如果移动菜单是打开的，点击后关闭
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // 添加CSS类以显示移动菜单
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: white;
                padding: 1rem 0;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            
            .mobile-menu-btn.active i:before {
                content: '\\f00d';
            }
            
            header.scrolled {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                background-color: rgba(255, 255, 255, 0.98);
            }
        }
    `;
    document.head.appendChild(style);

    // 初始化动画
    initAnimeAnimations();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 创建英雄区模型
    createHeroMockup();
    
    // 初始化粒子效果
    initParticles();
    
    // 初始化SVG动画
    initSvgAnimations();
    
    // 初始化代码演示
    initCodeDemo();
    
    // 添加流动线效果
    addFlowingLinesEffect();
    
    // 创建二维码
    createQRCode();
    
    // 初始化场景滑动
    initScenesSlider();
    
    // 初始化微信二维码弹窗
    initWechatModal();

    // 初始化肤色预设
    initSkinTonePresets();
    
    // 处理自定义肤色输入
    const skinToneInput = document.getElementById('skin-tone-color');
    if (skinToneInput) {
        skinToneInput.addEventListener('input', (e) => {
            updateSkinTonePreview(e.target.value);
        });
        
        // 设置默认肤色（使用第一个预设）
        if (skinTonePresets.length > 0) {
            skinToneInput.value = skinTonePresets[0].hex;
            updateSkinTonePreview(skinTonePresets[0].hex);
        }
    }
});

// 初始化粒子效果
function initParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, i) => {
        const size = anime.random(10, 30);
        const posX = anime.random(0, 100);
        const posY = anime.random(0, 100);
        const delay = anime.random(0, 2000);
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        anime({
            targets: particle,
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0.5],
            translateX: anime.random(-100, 100),
            translateY: anime.random(-100, 100),
            duration: anime.random(4000, 8000),
            delay: delay,
            easing: 'easeOutExpo',
            loop: true
        });
    });
}

// 初始化代码演示区域
function initCodeDemo() {
    const codeTabs = document.querySelectorAll('.code-tab');
    
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // 更新标签激活状态
            document.querySelectorAll('.code-tab').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            
            // 更新面板显示
            document.querySelectorAll('.code-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            
            // 运行相应的演示动画
            runDemoAnimation(tabId);
        });
    });
    
    // 初始化运行第一个演示动画
    runDemoAnimation('tab-1');
}

// 运行演示动画
function runDemoAnimation(tabId) {
    // 清除现有动画
    anime.remove('.cat-paw, .light-effect');
    
    switch(tabId) {
        case 'tab-1':
            anime({
                targets: '.cat-paw',
                scale: [0.8, 1.2],
                opacity: [0.6, 1],
                duration: 1000,
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutQuad'
            });
            break;
            
        case 'tab-2':
            anime({
                targets: '.light-effect',
                translateX: () => anime.random(-30, 30),
                translateY: () => anime.random(-30, 30),
                scale: () => anime.random(0.8, 1.2),
                rotate: () => anime.random(-15, 15),
                duration: 1500,
                delay: anime.stagger(100),
                easing: 'easeOutElastic(1, .6)',
                complete: function(anim) {
                    if(document.querySelector('.code-tab.active').getAttribute('data-tab') === 'tab-2') {
                        anim.restart();
                    }
                }
            });
            break;
            
        case 'tab-3':
            const timeline = anime.timeline({
                easing: 'easeOutExpo',
                duration: 750
            });
            
            timeline
                .add({
                    targets: '.light-effect:nth-child(1)',
                    translateY: [50, 0],
                    opacity: [0, 1],
                    scale: [0.5, 1]
                })
                .add({
                    targets: '.light-effect:nth-child(2), .light-effect:nth-child(3)',
                    translateY: [50, 0],
                    opacity: [0, 1],
                    scale: [0.5, 1]
                }, '-=600')
                .add({
                    targets: '.light-effect:nth-child(4), .light-effect:nth-child(5)',
                    translateY: [50, 0],
                    opacity: [0, 1],
                    scale: [0.5, 1]
                }, '-=600')
                .add({
                    targets: '.cat-paw',
                    translateX: [50, 0],
                    opacity: [0, 1],
                    scale: [0.5, 1]
                }, '-=600')
                .add({
                    delay: 1000,
                    complete: function() {
                        if(document.querySelector('.code-tab.active').getAttribute('data-tab') === 'tab-3') {
                            resetTimelineAnimation();
                            setTimeout(() => runDemoAnimation('tab-3'), 300);
                        }
                    }
                });
            break;
    }
}

// 重置时间线动画
function resetTimelineAnimation() {
    anime.set('.light-effect, .cat-paw', {
        translateY: 0,
        translateX: 0,
        scale: 0,
        opacity: 0
    });
}

// 初始化 anime.js 动画
function initAnimeAnimations() {
    // 使用anime.js为元素添加动画效果
    
    // 文本动画
    anime({
        targets: '.animate-text',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: (el, i) => 300 + 100 * i
    });
    
    // 按钮动画
    anime({
        targets: '.animate-btn',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: (el, i) => 600 + 150 * i
    });
    
    // 应用图片动画
    anime({
        targets: '.animate-mockup',
        opacity: [0, 1],
        translateY: [50, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: 500
    });
    
    // 下载按钮动画
    anime({
        targets: '.anime-download-btn',
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: (el, i) => 300 + 150 * i
    });

    // 控制元素交互动画 (恢复control-features部分的滑块功能)
    initControlFeatures();
}

// 恢复控制功能交互
function initControlFeatures() {
    // 处理颜色选择滑块
    const colorHandles = document.querySelectorAll('.svg-color-handle');
    colorHandles.forEach(handle => {
        let isDragging = false;
        const svg = handle.closest('svg');
        const track = svg.querySelector('.svg-color-track');
        
        if (!track) return;
        
        const trackRect = track.getBoundingClientRect();
        const trackWidth = parseFloat(track.getAttribute('width'));
        const defaultX = parseFloat(handle.getAttribute('cx'));
        
        // 鼠标事件
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        
        // 触摸事件
        handle.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', endDrag);
        
        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
            handle.style.filter = 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))';
        }
        
        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            let clientX;
            if (e.type.includes('touch')) {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            const svgRect = svg.getBoundingClientRect();
            const trackLeft = parseFloat(track.getAttribute('x'));
            const relativeX = clientX - svgRect.left;
            
            // 计算滑块在轨道内的位置限制
            const minX = trackLeft;
            const maxX = trackLeft + trackWidth;
            let newX = Math.max(minX, Math.min(maxX, relativeX));
            
            // 更新滑块位置
            handle.setAttribute('cx', newX);
            
            // 更新显示效果，例如更改一些关联元素的颜色
            const colorPosition = (newX - trackLeft) / trackWidth;
            updateColorEffect(colorPosition);
        }
        
        function endDrag() {
            if (isDragging) {
                isDragging = false;
                handle.style.filter = '';
            }
        }
        
        function updateColorEffect(position) {
            // 根据位置获取颜色 - 从渐变中采样
            // 这里简化处理，使用HSL颜色模型计算颜色
            const hue = position * 360; // 0-360度色相
            const color = `hsl(${hue}, 100%, 50%)`;
            
            // 更新相关元素的颜色
            const featIcons = document.querySelectorAll('.feature-icon');
            featIcons.forEach(icon => {
                icon.style.background = `linear-gradient(135deg, ${color}33, ${color}11)`;
                const paths = icon.querySelectorAll('.svg-icon-path');
                paths.forEach(path => {
                    path.style.stroke = color;
                });
            });
        }
    });
    
    // 处理亮度和大小控制滑块
    const controlSvgs = document.querySelectorAll('.control-svg:not(.color-wheel-svg)');
    controlSvgs.forEach(svg => {
        const handle = svg.querySelector('.svg-slider-handle');
        const track = svg.querySelector('.svg-slider-track');
        
        if (!handle || !track) return;
        
        let isDragging = false;
        const trackLength = parseFloat(track.getAttribute('x2')) - parseFloat(track.getAttribute('x1'));
        const trackStart = parseFloat(track.getAttribute('x1'));
        
        // 鼠标事件
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        
        // 触摸事件
        handle.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', endDrag);
        
        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
            handle.style.filter = 'drop-shadow(0 0 10px rgba(77, 246, 250, 0.8))';
        }
        
        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            let clientX;
            if (e.type.includes('touch')) {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            const svgRect = svg.getBoundingClientRect();
            const relativeX = clientX - svgRect.left;
            
            // 计算滑块位置
            const minX = trackStart;
            const maxX = trackStart + trackLength;
            let newX = Math.max(minX, Math.min(maxX, relativeX));
            
            // 更新滑块位置
            handle.setAttribute('cx', newX);
            
            // 计算百分比值
            const percentage = (newX - minX) / (maxX - minX);
            
            // 根据滑块类型更新相应的视觉效果
            if (handle.classList.contains('brightness-handle')) {
                updateBrightnessEffect(percentage);
            } else {
                updateSizeEffect(percentage);
            }
        }
        
        function endDrag() {
            if (isDragging) {
                isDragging = false;
                handle.style.filter = '';
            }
        }
        
        function updateBrightnessEffect(value) {
            // 更新亮度效果
            const brightness = 0.6 + value * 0.8; // 60%-140%范围
            const elements = document.querySelectorAll('.svg-icon-path, .svg-tech-path, .svg-scene-path');
            elements.forEach(elem => {
                elem.style.filter = `brightness(${brightness})`;
            });
        }
        
        function updateSizeEffect(value) {
            // 更新大小效果
            const scale = 0.8 + value * 0.4; // 80%-120%范围
            const elements = document.querySelectorAll('.feature-svg, .tech-svg');
            elements.forEach(elem => {
                elem.style.transform = `scale(${scale})`;
            });
        }
    });
}

// 初始化滚动触发的动画
function initScrollAnimations() {
    // 核心功能卡片动画
    document.querySelectorAll('.anime-card').forEach((card, index) => {
        addScrollAnimation(card, {
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: 150 * index
        });
    });
    
    // 场景卡片动画
    document.querySelectorAll('.anime-slide').forEach((slide, index) => {
        addScrollAnimation(slide, {
            translateX: [-50, 0],
            opacity: [0, 1],
            easing: 'easeOutQuad',
            duration: 800,
            delay: 100 * index
        });
    });
    
    // 控制项动画
    document.querySelectorAll('.anime-control').forEach((control, index) => {
        addScrollAnimation(control, {
            scale: [0.8, 1],
            opacity: [0, 1],
            easing: 'easeOutElastic(1, .6)',
            duration: 800,
            delay: 150 * index
        });
    });
    
    // 技术特点动画
    document.querySelectorAll('.anime-tech').forEach((tech, index) => {
        addScrollAnimation(tech, {
            translateY: [50, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 800,
            delay: 100 * index
        });
    });
    
    // 关于我和联系信息淡入
    document.querySelectorAll('.anime-fade').forEach((fade, index) => {
        addScrollAnimation(fade, {
            opacity: [0, 1],
            easing: 'easeOutQuad',
            duration: 1200,
            delay: 200 * index
        });
    });
    
    // 章节标题动画
    document.querySelectorAll('.anime-trigger').forEach((trigger) => {
        addScrollAnimation(trigger, {
            translateY: [30, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1000
        });
    });
}

// 添加滚动触发动画
function addScrollAnimation(element, animationParams) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    ...animationParams
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(element);
}

// 创建英雄区域的SVG图片 - 基于实际应用界面更新
function createHeroMockup() {
    const heroImageContainer = document.querySelector('.hero-image');
    if (!heroImageContainer) return;
    
    // 创建website/images目录
    const imagesDir = document.createElement('div');
    imagesDir.style.display = 'none';
    document.body.appendChild(imagesDir);
    
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '600');
    svg.setAttribute('viewBox', '0 0 300 600');
    svg.setAttribute('class', 'hero-mockup');
    
    // 手机外壳
    const phone = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    phone.setAttribute('x', '50');
    phone.setAttribute('y', '50');
    phone.setAttribute('width', '200');
    phone.setAttribute('height', '400');
    phone.setAttribute('rx', '20');
    phone.setAttribute('ry', '20');
    phone.setAttribute('fill', '#292f36');
    svg.appendChild(phone);
    
    // 手机屏幕 - 使用紫色背景，对应截图中的磨皮感场景
    const screen = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    screen.setAttribute('x', '60');
    screen.setAttribute('y', '80');
    screen.setAttribute('width', '180');
    screen.setAttribute('height', '340');
    screen.setAttribute('rx', '5');
    screen.setAttribute('ry', '5');
    screen.setAttribute('fill', '#8e44ad'); // 紫色背景
    svg.appendChild(screen);
    
    // 应用标题
    const appTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    appTitle.setAttribute('x', '150');
    appTitle.setAttribute('y', '120');
    appTitle.setAttribute('text-anchor', 'middle');
    appTitle.setAttribute('fill', 'white');
    appTitle.setAttribute('font-size', '16');
    appTitle.setAttribute('font-weight', 'bold');
    appTitle.textContent = '猫爪补光';
    svg.appendChild(appTitle);
    
    // 灯光按钮
    const lightButton = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    lightButton.setAttribute('x', '170');
    lightButton.setAttribute('y', '100');
    lightButton.setAttribute('width', '40');
    lightButton.setAttribute('height', '40');
    lightButton.setAttribute('rx', '8');
    lightButton.setAttribute('ry', '8');
    lightButton.setAttribute('fill', 'rgba(255, 255, 255, 0.2)');
    svg.appendChild(lightButton);
    
    // 灯光图标
    const lightIcon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    lightIcon.setAttribute('cx', '190');
    lightIcon.setAttribute('cy', '120');
    lightIcon.setAttribute('r', '10');
    lightIcon.setAttribute('fill', '#9b59b6');
    svg.appendChild(lightIcon);
    
    // 猫爪星形光效
    const starLight = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    starLight.setAttribute('d', 'M150,250 L170,200 L150,150 L130,200 Z M120,230 L170,230 L190,270 L100,270 Z');
    starLight.setAttribute('fill', 'url(#starGradient)');
    starLight.setAttribute('opacity', '0.8');
    svg.appendChild(starLight);
    
    // 创建渐变
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.setAttribute('id', 'starGradient');
    gradient.setAttribute('cx', '50%');
    gradient.setAttribute('cy', '50%');
    gradient.setAttribute('r', '50%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#d35ef5'); // 亮紫色
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#9b59b6'); // 暗紫色
    stop2.setAttribute('stop-opacity', '0.5');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // 控制面板背景
    const controlPanel = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    controlPanel.setAttribute('x', '70');
    controlPanel.setAttribute('y', '320');
    controlPanel.setAttribute('width', '160');
    controlPanel.setAttribute('height', '90');
    controlPanel.setAttribute('rx', '10');
    controlPanel.setAttribute('ry', '10');
    controlPanel.setAttribute('fill', 'rgba(255, 255, 255, 0.2)');
    svg.appendChild(controlPanel);
    
    // 颜色选择器
    const colorSlider = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    colorSlider.setAttribute('x', '80');
    colorSlider.setAttribute('y', '340');
    colorSlider.setAttribute('width', '140');
    colorSlider.setAttribute('height', '15');
    colorSlider.setAttribute('rx', '7.5');
    colorSlider.setAttribute('ry', '7.5');
    colorSlider.setAttribute('fill', 'url(#colorGradient)');
    svg.appendChild(colorSlider);
    
    // 颜色选择器渐变
    const colorGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    colorGradient.setAttribute('id', 'colorGradient');
    colorGradient.setAttribute('x1', '0%');
    colorGradient.setAttribute('y1', '0%');
    colorGradient.setAttribute('x2', '100%');
    colorGradient.setAttribute('y2', '0%');
    
    const colors = ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff'];
    colors.forEach((color, index) => {
        const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop.setAttribute('offset', `${index * (100 / (colors.length - 1))}%`);
        stop.setAttribute('stop-color', color);
        colorGradient.appendChild(stop);
    });
    
    defs.appendChild(colorGradient);
    
    // 颜色选择器滑块
    const colorSliderHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    colorSliderHandle.setAttribute('cx', '150');
    colorSliderHandle.setAttribute('cy', '347.5');
    colorSliderHandle.setAttribute('r', '10');
    colorSliderHandle.setAttribute('fill', 'white');
    colorSliderHandle.setAttribute('stroke', '#ddd');
    colorSliderHandle.setAttribute('stroke-width', '2');
    svg.appendChild(colorSliderHandle);
    
    // 亮度文本
    const brightnessText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    brightnessText.setAttribute('x', '80');
    brightnessText.setAttribute('y', '375');
    brightnessText.setAttribute('fill', 'white');
    brightnessText.setAttribute('font-size', '12');
    brightnessText.textContent = '亮度';
    svg.appendChild(brightnessText);
    
    // 亮度滑块
    const brightnessSlider = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    brightnessSlider.setAttribute('x', '80');
    brightnessSlider.setAttribute('y', '385');
    brightnessSlider.setAttribute('width', '140');
    brightnessSlider.setAttribute('height', '8');
    brightnessSlider.setAttribute('rx', '4');
    brightnessSlider.setAttribute('ry', '4');
    brightnessSlider.setAttribute('fill', '#ddd');
    svg.appendChild(brightnessSlider);
    
    // 亮度滑块填充部分
    const brightnessSliderFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    brightnessSliderFill.setAttribute('x', '80');
    brightnessSliderFill.setAttribute('y', '385');
    brightnessSliderFill.setAttribute('width', '70');
    brightnessSliderFill.setAttribute('height', '8');
    brightnessSliderFill.setAttribute('rx', '4');
    brightnessSliderFill.setAttribute('ry', '4');
    brightnessSliderFill.setAttribute('fill', '#d35ef5'); // 紫色
    svg.appendChild(brightnessSliderFill);
    
    // 亮度滑块手柄
    const brightnessSliderHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    brightnessSliderHandle.setAttribute('cx', '150');
    brightnessSliderHandle.setAttribute('cy', '389');
    brightnessSliderHandle.setAttribute('r', '8');
    brightnessSliderHandle.setAttribute('fill', '#d35ef5');
    svg.appendChild(brightnessSliderHandle);
    
    // 添加到容器
    heroImageContainer.innerHTML = '';
    heroImageContainer.appendChild(svg);
    
    // 保存SVG到images目录
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // 创建images目录
    const imagesFolder = document.createElement('div');
    imagesFolder.id = 'images-folder';
    imagesFolder.style.display = 'none';
    document.body.appendChild(imagesFolder);
    
    // 创建一个链接元素，用于保存SVG
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = 'hero-mockup.svg';
    imagesFolder.appendChild(link);
}

// 创建二维码SVG
function createQRCode() {
    const qrCodeContainer = document.querySelector('.qr-code img');
    if (!qrCodeContainer) return;
    
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '150');
    svg.setAttribute('height', '150');
    svg.setAttribute('viewBox', '0 0 150 150');
    svg.setAttribute('class', 'qr-code-svg');
    
    // 背景
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', '150');
    background.setAttribute('height', '150');
    background.setAttribute('fill', 'white');
    svg.appendChild(background);
    
    // 简单的QR码模式
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if ((i === 0 || i === 6) || (j === 0 || j === 6) || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
                const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                square.setAttribute('x', 20 + j * 15);
                square.setAttribute('y', 20 + i * 15);
                square.setAttribute('width', '15');
                square.setAttribute('height', '15');
                square.setAttribute('fill', 'black');
                svg.appendChild(square);
            }
        }
    }
    
    // 添加到容器
    qrCodeContainer.parentNode.replaceChild(svg, qrCodeContainer);
    
    // 保存SVG到images目录
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // 创建一个链接元素，用于保存SVG
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = 'qr-code.svg';
    document.getElementById('images-folder').appendChild(link);
}

// Figma通信部分
class FigmaConnector {
    constructor(channel) {
        this.channel = channel;
        this.socket = null;
        this.connected = false;
        this.personalAccessToken = null;
    }

    // 初始化Socket.io连接
    init() {
        if (typeof io !== 'undefined') {
            this.socket = io();
            this.setupSocketListeners();
            console.log(`Figma连接器初始化，通道: ${this.channel}`);
        } else {
            console.error('Socket.io未加载，请确保在HTML中引入了socket.io客户端库');
        }
    }

    // 设置Socket.io事件监听
    setupSocketListeners() {
        this.socket.on('connect', () => {
            console.log('已连接到服务器');
            this.connected = true;
        });

        this.socket.on('disconnect', () => {
            console.log('与服务器断开连接');
            this.connected = false;
        });

        this.socket.on('figma:response', (data) => {
            console.log('收到来自服务器的Figma响应:', data);
            this.handleFigmaResponse(data);
        });
    }

    // 连接Figma API
    async connectToFigma(personalAccessToken) {
        this.personalAccessToken = personalAccessToken;
        
        try {
            const response = await fetch('/api/figma/connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ personalAccessToken })
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('成功连接到Figma API');
                return true;
            } else {
                console.error('连接Figma API失败:', data.message);
                return false;
            }
        } catch (error) {
            console.error('连接Figma API时出错:', error);
            return false;
        }
    }

    // 向Figma发送消息
    sendToFigma(message) {
        if (!this.connected) {
            console.error('尚未连接到服务器，无法发送消息');
            return false;
        }
        
        this.socket.emit('figma:message', {
            channel: this.channel,
            message: message
        });
        
        console.log(`已向Figma发送消息（通道: ${this.channel}）:`, message);
        return true;
    }

    // 处理来自Figma的响应
    handleFigmaResponse(data) {
        // 这里可以根据需要处理Figma的响应
        // 例如更新UI或触发其他操作
        if (data.channel === this.channel) {
            console.log('处理来自Figma的响应:', data);
        }
    }
}

// 在页面加载完成后初始化Figma连接器
document.addEventListener('DOMContentLoaded', function() {
    // 只有当需要与Figma通信时才创建连接
    // 这里可以根据实际需求调整
    const figmaConnector = new FigmaConnector('uglsshak');
    
    // 将连接器添加到window对象以便于调试
    window.figmaConnector = figmaConnector;
    
    // 在页面上添加测试按钮（可选）
    const createTestButton = () => {
        const container = document.querySelector('.container');
        if (container) {
            const testButton = document.createElement('button');
            testButton.innerText = '测试Figma连接';
            testButton.style.display = 'none'; // 在开发环境下可以设为'block'
            testButton.addEventListener('click', () => {
                figmaConnector.init();
                // 这里可以添加测试代码
            });
            container.appendChild(testButton);
        }
    };
    
    // 只在开发环境下添加测试按钮
    if (window.location.hostname === 'localhost') {
        createTestButton();
    }
});

// 初始化SVG动画
function initSvgAnimations() {
    // 创建SVG背景波浪动画
    anime({
        targets: '.svg-path-1',
        translateY: [-10, 10],
        duration: 8000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });
    
    anime({
        targets: '.svg-path-2',
        translateY: [-5, 15],
        duration: 12000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: 200
    });
    
    anime({
        targets: '.svg-path-3',
        translateY: [-15, 5],
        duration: 10000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: 400
    });

    // 创建猫爪SVG动画
    const pawPaths = document.querySelectorAll('.paw-path');
    pawPaths.forEach(path => {
        const drawablePath = anime.createDrawable(path);
        anime({
            targets: drawablePath,
            draw: ['0% 0%', '0% 100%'],
            duration: 1000,
            delay: anime.stagger(200),
            easing: 'easeOutQuad'
        });
    });
    
    // 创建全页面SVG分割线动画
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const svgLines = entry.target.querySelectorAll('.svg-line');
                const svgCircles = entry.target.querySelectorAll('.svg-circle');
                
                svgLines.forEach(line => {
                    const drawableLine = anime.createDrawable(line);
                    anime({
                        targets: drawableLine,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 1000,
                        easing: 'easeInOutSine'
                    });
                });
                
                svgCircles.forEach(circle => {
                    const drawableCircle = anime.createDrawable(circle);
                    anime({
                        targets: drawableCircle,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 800,
                        delay: 800,
                        easing: 'easeInOutSine'
                    });
                });
                
                dividerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.svg-divider').forEach(divider => {
        dividerObserver.observe(divider);
    });
    
    // 创建功能卡片SVG图标动画
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iconPaths = entry.target.querySelectorAll('.svg-icon-path');
                
                iconPaths.forEach(path => {
                    const drawablePath = anime.createDrawable(path);
                    anime({
                        targets: drawablePath,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 1200,
                        delay: 300,
                        easing: 'easeOutQuad'
                    });
                });
                
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    document.querySelectorAll('.feature-card').forEach(card => {
        featureObserver.observe(card);
    });
    
    // 创建场景卡片SVG路径动画
    const sceneObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scenePaths = entry.target.querySelectorAll('.svg-scene-path');
                
                scenePaths.forEach(path => {
                    const drawablePath = anime.createDrawable(path);
                    anime({
                        targets: drawablePath,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 1500,
                        easing: 'easeOutQuad',
                        complete: function() {
                            anime({
                                targets: drawablePath,
                                fillOpacity: [0, 0.2],
                                duration: 800,
                                easing: 'easeInQuad'
                            });
                        }
                    });
                });
                
                sceneObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.scene-card').forEach(card => {
        sceneObserver.observe(card);
    });
    
    // 修改控制滑块动画和交互功能
    const controlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const controlBg = entry.target.querySelector('.svg-control-bg');
                const sliderTrack = entry.target.querySelector('.svg-slider-track');
                const sliderHandle = entry.target.querySelector('.svg-slider-handle');
                
                // 背景动画
                const drawableBg = anime.createDrawable(controlBg);
                anime({
                    targets: drawableBg,
                    draw: ['0% 0%', '0% 100%'],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                
                // 滑块轨道动画 - 添加流动描边效果
                anime({
                    targets: sliderTrack,
                    strokeDashoffset: [anime.setDashoffset, 0],
                    duration: 800,
                    delay: 400,
                    easing: 'easeOutQuad',
                    complete: function() {
                        // 完成初始动画后添加持续流动效果
                        anime({
                            targets: sliderTrack,
                            strokeDashoffset: [0, -300],
                            duration: 3000,
                            loop: true,
                            easing: 'linear'
                        });
                    }
                });
                
                // 滑块手柄动画
                anime({
                    targets: sliderHandle,
                    opacity: [0, 1],
                    scale: [0, 1],
                    duration: 600,
                    delay: 800,
                    easing: 'easeOutElastic(1, 0.5)'
                });
                
                // 互动功能修复
                if (sliderHandle) {
                    let isDragging = false;
                    
                    const handleMouseDown = (e) => {
                        isDragging = true;
                        // 阻止默认事件，防止文本选择等
                        e.preventDefault();
                        document.body.style.cursor = 'grabbing';
                    };
                    
                    const handleMouseMove = (e) => {
                        if (!isDragging) return;
                        
                        const svg = sliderHandle.closest('svg');
                        const svgRect = svg.getBoundingClientRect();
                        const svgX = e.clientX - svgRect.left;
                        
                        // 计算x位置限制在30-170范围内
                        let x = Math.max(30, Math.min(170, svgX));
                        
                        // 更新滑块位置
                        sliderHandle.setAttribute('cx', x);
                        
                        // 触发变化事件，可以用于实际控制逻辑
                        const percentage = (x - 30) / 140;
                        const event = new CustomEvent('sliderchange', { 
                            detail: { 
                                value: percentage,
                                slider: sliderHandle 
                            } 
                        });
                        document.dispatchEvent(event);
                    };
                    
                    const handleMouseUp = () => {
                        if (isDragging) {
                            isDragging = false;
                            document.body.style.cursor = '';
                        }
                    };
                    
                    // 添加触摸支持
                    const handleTouchStart = (e) => {
                        isDragging = true;
                        e.preventDefault();
                    };
                    
                    const handleTouchMove = (e) => {
                        if (!isDragging) return;
                        
                        const svg = sliderHandle.closest('svg');
                        const svgRect = svg.getBoundingClientRect();
                        const touch = e.touches[0];
                        const svgX = touch.clientX - svgRect.left;
                        
                        let x = Math.max(30, Math.min(170, svgX));
                        sliderHandle.setAttribute('cx', x);
                        
                        const percentage = (x - 30) / 140;
                        const event = new CustomEvent('sliderchange', { 
                            detail: { 
                                value: percentage,
                                slider: sliderHandle 
                            } 
                        });
                        document.dispatchEvent(event);
                    };
                    
                    const handleTouchEnd = () => {
                        isDragging = false;
                    };
                    
                    // 移除可能存在的旧事件监听器
                    sliderHandle.removeEventListener('mousedown', handleMouseDown);
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                    
                    sliderHandle.removeEventListener('touchstart', handleTouchStart);
                    document.removeEventListener('touchmove', handleTouchMove);
                    document.removeEventListener('touchend', handleTouchEnd);
                    
                    // 添加新的事件监听器
                    sliderHandle.addEventListener('mousedown', handleMouseDown);
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                    
                    sliderHandle.addEventListener('touchstart', handleTouchStart);
                    document.addEventListener('touchmove', handleTouchMove);
                    document.addEventListener('touchend', handleTouchEnd);
                    
                    // 确保指针样式正确
                    sliderHandle.style.cursor = 'grab';
                }
                
                controlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.control-item').forEach(item => {
        controlObserver.observe(item);
    });
    
    // 增强技术特点SVG动画，添加流动光效
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const techPaths = entry.target.querySelectorAll('.svg-tech-path, .svg-tech-rect, .svg-tech-screen, .svg-tech-circle, .svg-tech-star, .svg-tech-paw');
                const techLines = entry.target.querySelectorAll('.svg-tech-line');
                const techButtons = entry.target.querySelectorAll('.svg-tech-button');
                
                // 主要路径动画
                techPaths.forEach(path => {
                    const drawablePath = anime.createDrawable(path);
                    anime({
                        targets: drawablePath,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 1500,
                        delay: anime.stagger(200),
                        easing: 'easeOutQuad',
                        complete: function() {
                            // 添加持续流动描边效果
                            anime({
                                targets: path,
                                strokeDashoffset: [0, -300],
                                duration: 5000,
                                loop: true,
                                easing: 'linear'
                            });
                        }
                    });
                });
                
                // 线条动画增强
                techLines.forEach(line => {
                    const drawableLine = anime.createDrawable(line);
                    anime({
                        targets: drawableLine,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 600,
                        delay: anime.stagger(100, {start: 800}),
                        easing: 'easeOutQuad',
                        complete: function() {
                            // 添加脉冲效果
                            anime({
                                targets: line,
                                strokeWidth: [2, 4, 2],
                                strokeOpacity: [1, 0.7, 1],
                                duration: 2000,
                                loop: true,
                                easing: 'easeInOutSine'
                            });
                        }
                    });
                });
                
                // 按钮淡入动画
                anime({
                    targets: techButtons,
                    opacity: [0, 1],
                    duration: 800,
                    delay: 1200,
                    easing: 'easeInOutQuad',
                    complete: function() {
                        // 添加呼吸效果
                        anime({
                            targets: techButtons,
                            opacity: [1, 0.7, 1],
                            scale: [1, 1.1, 1],
                            duration: 2500,
                            loop: true,
                            easing: 'easeInOutSine'
                        });
                    }
                });
                
                techObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.tech-item').forEach(item => {
        techObserver.observe(item);
    });
    
    // 创建下载区SVG动画
    const downloadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const downloadPaths = entry.target.querySelectorAll('.download-path-1, .download-path-2, .download-path-3');
                const downloadCircle = entry.target.querySelector('.download-circle');
                const downloadArrow = entry.target.querySelector('.download-arrow');
                
                // 波浪路径动画
                downloadPaths.forEach((path, index) => {
                    const drawablePath = anime.createDrawable(path);
                    anime({
                        targets: drawablePath,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 1500,
                        delay: index * 300,
                        easing: 'easeOutSine'
                    });
                });
                
                // 圆圈动画
                if (downloadCircle) {
                    const drawableCircle = anime.createDrawable(downloadCircle);
                    anime({
                        targets: drawableCircle,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 1200,
                        delay: 1000,
                        easing: 'easeOutQuad'
                    });
                }
                
                // 箭头动画
                if (downloadArrow) {
                    const drawableArrow = anime.createDrawable(downloadArrow);
                    anime({
                        targets: drawableArrow,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 800,
                        delay: 1800,
                        easing: 'easeOutQuad',
                        complete: function() {
                            // 循环动画
                            anime({
                                targets: downloadArrow,
                                translateY: [0, 5, 0],
                                duration: 1500,
                                loop: true,
                                easing: 'easeInOutQuad'
                            });
                        }
                    });
                }
                
                downloadObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.download-svg-container').forEach(container => {
        downloadObserver.observe(container);
    });
    
    // 创建联系区SVG动画
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const contactPaths = entry.target.querySelectorAll('.contact-path');
                
                // 笑脸动画
                contactPaths.forEach((path, index) => {
                    const drawablePath = anime.createDrawable(path);
                    anime({
                        targets: drawablePath,
                        draw: ['0% 0%', '0% 100%'],
                        duration: 1200,
                        delay: index * 300,
                        easing: 'easeOutQuad'
                    });
                });
                
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.contact-svg-container').forEach(container => {
        contactObserver.observe(container);
    });
    
    // 导航箭头SVG动画
    document.querySelectorAll('.svg-arrow').forEach(arrow => {
        const drawableArrow = anime.createDrawable(arrow);
        anime({
            targets: drawableArrow,
            draw: ['0% 0%', '0% 100%'],
            duration: 600,
            easing: 'easeOutQuad'
        });
    });
}

// 添加流动线条效果
function addFlowingLinesEffect() {
    const svgPaths = document.querySelectorAll('.svg-path-1, .svg-path-2, .svg-path-3, .svg-scene-path, .svg-icon-path, .svg-tech-path, .download-path-1, .download-path-2, .download-path-3, .contact-path');
    
    svgPaths.forEach(path => {
        // 设置描边属性，准备动画
        path.setAttribute('stroke-dasharray', '10,5');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke', 'rgba(124, 77, 255, 0.5)'); // 使用主题紫色
        
        // 创建流动效果
        anime({
            targets: path,
            strokeDashoffset: [0, -300],
            duration: 8000,
            loop: true,
            easing: 'linear',
            delay: anime.random(0, 2000) // 随机延迟，使效果更自然
        });
    });
    
    // 为分隔线添加扫描光效果
    const dividers = document.querySelectorAll('.svg-divider');
    dividers.forEach(divider => {
        // 创建一个渐变光扫描效果
        const scanLight = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        scanLight.setAttribute('width', '30');
        scanLight.setAttribute('height', '30');
        scanLight.setAttribute('fill', 'rgba(255, 255, 255, 0.5)');
        scanLight.setAttribute('filter', 'blur(10px)');
        scanLight.classList.add('scan-light');
        
        const svg = divider.querySelector('svg');
        if (svg) {
            svg.appendChild(scanLight);
            
            // 添加扫描动画
            anime({
                targets: scanLight,
                translateX: [-50, 350],
                translateY: [10, 10],
                opacity: [0, 0.7, 0],
                duration: 3000,
                loop: true,
                delay: 1000,
                easing: 'easeInOutSine'
            });
        }
    });
}

// 增强场景滑动功能
function initScenesSlider() {
    const scenesSlider = document.querySelector('.scenes-slider');
    const prevBtn = document.querySelector('.scenes-prev');
    const nextBtn = document.querySelector('.scenes-next');
    
    if (!scenesSlider || !prevBtn || !nextBtn) return;
    
    // 初始化按钮状态
    updateButtonStates();
    
    // 添加点击事件
    prevBtn.addEventListener('click', () => {
        scenesSlider.scrollBy({
            left: -340, // 卡片宽度+间距
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        scenesSlider.scrollBy({
            left: 340, // 卡片宽度+间距
            behavior: 'smooth'
        });
    });
    
    // 监听滚动更新按钮状态
    scenesSlider.addEventListener('scroll', updateButtonStates);
    
    // 更新按钮状态
    function updateButtonStates() {
        // 检查是否可以向左滚动
        if (scenesSlider.scrollLeft <= 10) {
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.classList.remove('disabled');
        }
        
        // 检查是否可以向右滚动
        if (Math.ceil(scenesSlider.scrollLeft + scenesSlider.clientWidth) >= scenesSlider.scrollWidth - 10) {
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.classList.remove('disabled');
        }
    }
    
    // 添加鼠标拖动支持
    let isDown = false;
    let startX;
    let scrollLeft;
    
    scenesSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        scenesSlider.style.cursor = 'grabbing';
        startX = e.pageX - scenesSlider.offsetLeft;
        scrollLeft = scenesSlider.scrollLeft;
        e.preventDefault();
    });
    
    scenesSlider.addEventListener('mouseleave', () => {
        isDown = false;
        scenesSlider.style.cursor = 'grab';
    });
    
    scenesSlider.addEventListener('mouseup', () => {
        isDown = false;
        scenesSlider.style.cursor = 'grab';
    });
    
    scenesSlider.addEventListener('mousemove', function(e) {
        if (!isMouseDown) return;
        const x = e.pageX - scenesSlider.offsetLeft;
        const walk = (x - startX) * 1.5; // 滚动速度
        scenesSlider.scrollLeft = scrollLeft - walk;
    });
    
    // 为场景卡片添加触摸反馈
    sceneCards.forEach(card => {
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = 'transform 0.3s ease';
        });
    });
    
    // 窗口大小变化时更新布局
    window.addEventListener('resize', function() {
        // 重新计算卡片宽度
        const newCardWidth = sceneCards[0].offsetWidth;
        const newTotalCardWidth = newCardWidth + cardGap;
        
        // 更新按钮状态
        updateButtonState();
    });
}

// 初始化微信二维码弹窗
function initWechatModal() {
    const wechatLink = document.getElementById('wechat-link');
    const wechatModal = document.getElementById('wechat-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (!wechatLink || !wechatModal || !closeModal) return;
    
    // 点击微信图标打开弹窗
    wechatLink.addEventListener('click', function(e) {
        e.preventDefault();
        wechatModal.style.display = 'block';
        
        // 添加打开动画
        anime({
            targets: '.modal-content',
            scale: [0.9, 1],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 400
        });
    });
    
    // 点击关闭按钮关闭弹窗
    closeModal.addEventListener('click', function() {
        anime({
            targets: '.modal-content',
            scale: [1, 0.9],
            opacity: [1, 0],
            easing: 'easeInExpo',
            duration: 300,
            complete: function() {
                wechatModal.style.display = 'none';
            }
        });
    });
    
    // 点击弹窗外部关闭弹窗
    wechatModal.addEventListener('click', function(e) {
        if (e.target === wechatModal) {
            anime({
                targets: '.modal-content',
                scale: [1, 0.9],
                opacity: [1, 0],
                easing: 'easeInExpo',
                duration: 300,
                complete: function() {
                    wechatModal.style.display = 'none';
                }
            });
        }
    });
}

// 肤色预设数据
const skinTonePresets = [
    { name: "浅色肌肤", hex: "#FFE4C0", rgb: "255, 228, 192" },
    { name: "中等肌肤", hex: "#E6B27F", rgb: "230, 178, 127" },
    { name: "深褐色肌肤", hex: "#AA6E33", rgb: "170, 110, 51" },
    { name: "深色肌肤", hex: "#553118", rgb: "85, 49, 24" }
];

// 初始化肤色预设显示
function initSkinTonePresets() {
    const presetsContainer = document.getElementById('skin-tone-presets');
    if (!presetsContainer) return;
    
    presetsContainer.innerHTML = '';
    
    skinTonePresets.forEach(preset => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.setAttribute('data-color', preset.hex);
        card.setAttribute('data-rgb', preset.rgb);
        
        card.innerHTML = `
            <div class="scene-image">
                <div class="color-display" style="background-color: ${preset.hex}"></div>
                <div class="scene-overlay"></div>
                <div class="color-preview">
                    <span>${preset.name}</span>
                    <span>${preset.hex}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            document.getElementById('skin-tone-color').value = preset.hex;
            updateSkinTonePreview(preset.hex);
            document.querySelectorAll('.scene-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
        
        presetsContainer.appendChild(card);
    });
}

// 更新肤色预览
function updateSkinTonePreview(color) {
    const preview = document.getElementById('skin-tone-preview');
    if (preview) {
        preview.style.backgroundColor = color;
    }
}