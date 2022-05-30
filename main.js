import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  renderer.render(scene, camera);

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  // const material = new THREE.MeshBasicMaterial( {color: 0xFF6347, wireframe: true }); 
  // if you want just the floating torus
  const material = new THREE.MeshStandardMaterial( {color: 0xFF6347, wireframe: true });
  const torus = new THREE.Mesh(geometry, material);

  scene.add(torus)

  // Lighting
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5)

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight)

  // const lightHelper = new THREE.PointLightHelper(pointLight);
  // const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera, renderer.domElement);

  // Adding Stars
  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 })
    const star = new THREE.Mesh( geometry, material );

    // randomly fills array with floats
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)
  }

  Array(200).fill().forEach(addStar)
 
  // Space Background
  const spaceTexture = new THREE.TextureLoader().load('../images/wallpaperflare.com_wallpaper.jpg');
  scene.background = spaceTexture;

  // Avatar
  const alTexture = new THREE.TextureLoader().load('../images/dp.jpg');

  const al = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({map: alTexture })
  );

  // scene.add(al)

  // Moon

  const moonTexture = new THREE.TextureLoader().load('../images/2k_haumea_fictional.jpg')
  const normalTexture = new THREE.TextureLoader().load('../images/7491-normal.jpg')

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture  })
  )

  scene.add(moon)

  function moveCamera() {
    const t= document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    al.rotation.y += 0.01;
    al.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
  }

  document.body.onscroll = moveCamera

  // Moon Position
  moon.position.z = 10;
  moon.position.setX(-9);

  function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.z += 0.01;

    controls.update();

    renderer.render(scene, camera);
  }

  animate()