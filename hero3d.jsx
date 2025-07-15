import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';

const AI3DLogo = () => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={3} rotationIntensity={2}>
      <mesh ref={meshRef}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#6366f1" 
          emissive="#4f46e5" 
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
        <Text
          position={[0, 0, 1.8]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          AI
        </Text>
      </mesh>
    </Float>
  );
};

const TypingAnimation = ({ texts }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const [textIndex, setTextIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (index < texts[textIndex].length) {
        setDisplayText(prev => prev + texts[textIndex][index]);
        setIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setDisplayText('');
          setIndex(0);
          setTextIndex((textIndex + 1) % texts.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [index, textIndex, texts]);

  return (
    <div className="text-center">
      <h2 className="text-5xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">
        {displayText}
        <span className="animate-pulse">|</span>
      </h2>
    </div>
  );
};

export default function Hero3D() {
  const typingTexts = [
    "AI-Powered Solutions",
    "Next Generation SaaS",
    "Innovative Technology",
    "Transform Your Business"
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full h-[60vh]">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <AI3DLogo />
        </Canvas>
      </div>
      <TypingAnimation texts={typingTexts} />
    </div>
  );
}
