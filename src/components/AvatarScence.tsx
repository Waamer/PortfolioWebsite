'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Text, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const Avatar: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/animatedModel.glb');
  const { actions } = useAnimations(animations, group);
  const [isStumbling, setIsStumbling] = useState(false);

  const { camera, size } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;

  useEffect(() => {
    perspectiveCamera.position.set(0.2, 0.4, 1);
    perspectiveCamera.aspect = size.width / size.height;
    perspectiveCamera.updateProjectionMatrix();

    if (actions) {
      const waveAction = actions['waving'];
      const stumbleAction = actions['reaction'];

      waveAction?.play();

      const handleMouseDown = (event: MouseEvent) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, perspectiveCamera);
        const intersects = raycaster.intersectObject(scene, true);

        if (intersects.length > 0 && !isStumbling) {
          setIsStumbling(true);
          stumbleAction?.reset().play();
          waveAction?.fadeOut(0.3);

          setTimeout(() => {
            waveAction?.reset().fadeIn(0.3);
            stumbleAction?.fadeOut(0.3);
            setIsStumbling(false);
          }, 1850);
        }
      };

      const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64);
      const groundMaterial = new THREE.MeshStandardMaterial({ color: '#F4A261' });
      const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      groundMesh.castShadow = false;
      groundMesh.receiveShadow = true;
      groundMesh.position.y -= 0.05;
      scene.add(groundMesh);

      const loader = new FontLoader()
      loader.load( 'font.typeface.inter.json', function ( font ) {

        const textGeometry = new TextGeometry( 'Click Me!', {
          font: font,
          size: 0.15,
          height: 0.04,
          curveSegments: 4,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.01,
          bevelOffset: 0,
          bevelSegments: 4,

        } );
        const textMaterial = new THREE.MeshStandardMaterial({ color: '#F4A261' });
        const text = new THREE.Mesh(textGeometry, textMaterial);
        text.position.set(-0.4, 1.85, 0)
        scene.add(text)
      } );


      window.addEventListener('mousedown', handleMouseDown);

      return () => {
        window.removeEventListener('mousedown', handleMouseDown);
      };
    }
  }, [actions, perspectiveCamera, size, isStumbling, scene]);

  useEffect(() => {
    if (group.current) {
      group.current.position.y = -0.2
    }
  }, [])

  return (
    <>
      <primitive ref={group} object={scene} />
    </>
  );
};

useGLTF.preload('/animatedModel.glb');

const AvatarScene: React.FC = () => {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.3} />
      <spotLight position={[0, 4, 2]} angle={1} penumbra={0.5} castShadow />
      <directionalLight position={[1, 1, 2]} intensity={0.5} />
      <OrbitControls enablePan={false} enableZoom={false} minDistance={3} minPolarAngle={1.4} maxPolarAngle={1.4} />
      <Avatar />
    </Canvas>
  );
};

export default AvatarScene;
