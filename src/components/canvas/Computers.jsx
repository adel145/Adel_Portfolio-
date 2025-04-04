import {Suspense, useEffect, useState} from 'react'
// Suspense (from React):
// Suspense allows React to "wait" for something (like data or components) to load before rendering the UI. It's often used with lazy loading or asynchronous components.
// מאפשר ל-React "להמתין" לטעינת נתונים או רכיבים לפני רינדור ה-UI. משמש לרוב עם טעינה עצלה או רכיבים אסינכרוניים.
// useEffect (from React):
// A React hook used to perform side effects in a functional component. For example, fetching data, updating the DOM, or subscribing/unsubscribing to events.
// Hook של React שמאפשר לבצע פעולות צדדיות (Side Effects) בתוך רכיב פונקציונלי, כמו בקשת נתונים מהשרת, עדכון ה-DOM, או הרשמה/ביטול הרשמה לאירועים.
// useState (from React):
// A React hook for managing state in a functional component. It lets you add and track dynamic variables (state) in your app.
// Hook של React לניהול מצב (State) בתוך רכיב פונקציונלי. מאפשר לעקוב אחר משתנים דינמיים באפליקציה.
import {Canvas} from '@react-three/fiber'
// Canvas (from @react-three/fiber):
// A React wrapper for Three.js that simplifies the process of creating 3D graphics. Canvas is the main component that provides a 3D rendering context for your scene.
// מעטפת React ל-Three.js שמפשטת את תהליך יצירת הגרפיקה התלת-ממדית. Canvas מספק הקשר רינדור תלת-ממדי לסצנה שלך.
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
// OrbitControls (from @react-three/drei):
// A helper component that allows users to interact with 3D objects using mouse or touch input. It enables actions like rotating, zooming, and panning the camera.
// רכיב עזר שמאפשר למשתמשים ליצור אינטראקציה עם אובייקטים תלת-ממדיים באמצעות עכבר או מגע. מאפשר פעולות כמו סיבוב, זום והזזת המצלמה.
// Preload (from @react-three/drei):
// A utility that preloads assets like textures or 3D models to ensure they are available before rendering the scene, improving performance and preventing flickers.
// כלי שמאפשר טעינה מוקדמת של משאבים (Assets) כמו טקסטורות או מודלים תלת-ממדיים, כדי לשפר ביצועים ולמנוע הבהובים.
// useGLTF (from @react-three/drei):
// A hook that simplifies loading GLTF/GLB 3D models. GLTF is a common 3D model format used in web applications.
// Hook שמפשט את הטעינה של מודלים תלת-ממדיים בפורמט GLTF/GLB. GLTF הוא פורמט נפוץ למודלים תלת-ממדיים באינטרנט
import CanvasLoader from '../Loader'
import { u } from 'framer-motion/client'


// const Computers = ({ isMobile }) => { 
//   // הגדרת קומפוננטת `Computers`, שמקבלת פרופ `isMobile` להתאמה למכשירים ניידים.
//   console.log('Computers component rendered with isMobile:', isMobile);
  
  
//   const computer = useGLTF('./a_personal_computer/scene.gltf'); 
//   // טעינת מודל תלת-ממדי של מחשב שולחני באמצעות GLTF Loader.

//   // const computer = useGLTF('./a_pe rsonal_computer/scene.gltf');
//   // דוגמה לטעינת מודל תלת-ממדי חלופי, כרגע בתגובה.

//   // return (
//   //   <div>Computers11</div>
//   // );
//   // קוד לדוגמה לצורכי בדיקה, כרגע בתגובה.

//   return (
//     <mesh> 
//       {/* מיכל להצגת אובייקטים תלת-ממדיים ותאורות. */}
      
//       <hemisphereLight intensity={3} groundColor="black" />
//       {/* הוספת תאורת המיספירה עם עוצמה גבוהה וצבע קרקע שחור. */}
      
//       <pointLight intensity={1} />
//       {/* הוספת תאורה נקודתית להארת הסצנה. */}
      
//       <spotLight 
//         position={[-20, 50, 10]} //מיקום
//         angle={0.12} //זווית
//         penumbra={1} //شبه ظل 
//         intensity={1} //עוצמה
//         castShadow // الظل الملقى
//         shadow-mapSize={1024} 
//       />
//       {/* הוספת תאורת ספוט עם מיקום, זווית, והגדרות צל מתאימות. */}

//       <primitive 
//         object={computer.scene} 
//         scale={isMobile ? 0.2 : 0.3}  // مقياس 
//         position={isMobile ? [0, -3, -2.2] : [0, 2,-20]} 
//         rotation={[0.12, -0.2, 0]} 
//       />
//       {/* הצגת המודל התלת-ממדי עם קנה מידה, מיקום, וסיבוב המשתנים לפי `isMobile`. */}
//     </mesh>
//   );
// };

// const ComputersCanvas = () => { 
//   // הגדרת קומפוננטת `ComputersCanvas` שמגדירה את הקונטקסט להצגה ומעבירה נתונים ל-`Computers`.

//   const [isMobile, setIsMobile] = useState(false); 
//   // משתנה מצב למעקב אחרי האם המכשיר הוא נייד.

//   useEffect(() => { 
//     // שימוש ב-Hook לזיהוי שינויים בגודל המסך ולעדכון `isMobile`.

//     const mediaQuery = window.matchMedia('(max-width: 500px)'); 
//     // יצירת שאילתת מדיה לבדיקה אם הרוחב של המסך הוא פחות מ-500 פיקסלים.

//     setIsMobile(mediaQuery.matches); 
//     // עדכון `isMobile` בהתאם להתאמת שאילתת המדיה הנוכחית.
//     console.log('Initial isMobile:', mediaQuery.matches);

//     const handleMediaQueryChange = (event) => { 
//       console.log('Media query change detected. New isMobile:', event.matches);
//       setIsMobile(event.matches); 
//       // עדכון `isMobile` בכל פעם ששאילתת המדיה משתנה.
//     };

//     mediaQuery.addEventListener('change', handleMediaQueryChange); 
//     // הוספת מאזין אירועים לשינויים בשאילתת המדיה.

//     return () => { 
//       mediaQuery.removeEventListener('change', handleMediaQueryChange); 
//       // ניקוי מאזין האירועים כשהקומפוננטה מסיימת את פעילותה.
//     };
//   }, []); 
//   // הרצת ה-Hook רק פעם אחת אחרי שהקומפוננטה נטענת.

//   return (
//     <Canvas 
//       frameLoop="demand" 
//       shadows 
//       camera={{ position: [20, 3, 5], fov: 25 }} 
//       gl={{ preserveDrawingBuffer: true }} 
//     >
//       {/* יצירת קנבס להצגת גרפיקה תלת-ממדית עם הגדרות מצלמה וצללים. */}

//       <Suspense fallback={<CanvasLoader />}> 
//         {/* שימוש במרכיב fallback בזמן שנטענים משאבי התלת-ממד. */}

//         <OrbitControls 
//           enableZoom={false} 
//           maxPolarAngle={Math.PI / 2} 
//           minPolarAngle={Math.PI / 2} 
//         />
//         {/* הוספת שליטה לסיבוב הסצנה, עם הגבלת תנועה אנכית. */}

//         <Computers isMobile={isMobile} /> 
//         {/* הצגת קומפוננטת `Computers` והעברת ערך `isMobile` כפרופ. */}
//       </Suspense>

//       <Preload all /> 
//       {/* טעינת כל המשאבים מראש לשיפור ביצועים. */}
//     </Canvas>
//   );
// };


const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};



export default ComputersCanvas; 
// ייצוא ברירת מחדל של הקומפוננטה `ComputersCanvas` לשימוש בחלקים אחרים של האפליקציה.


// const أجهزة الكمبيوتر = ({ هو_جوال }) => {
//   const كمبيوتر = استخدامGLTF("./desktop_pc/scene.gltf");

//   return (
//     <مجسم>
//       <ضوء_نصف_كرة كثافة={0.15} لون_الأرض='أسود' />
//       <ضوء_نقطة
//         موقع={[-20, 50, 10]}
//         زاوية={0.12}
//         حافة={1}
//         كثافة={1}
//         يلقي_ظل
//         حجم_الظل_الخريطة={1024}
//       />
//       <ضوء_نقطة كثافة={1} />
//       <مجسم_بدائي
//         كائن={كمبيوتر.scene}
//         مقياس={هو_جوال ? 0.7 : 0.75}
//         موقع={هو_جوال ? [0, -3, -2.2] : [0, -3.25, -1.5]}
//         دوران={[-0.01, -0.2, -0.1]}
//       />
//     </مجسم>
//   );
// };

// const كانفس_أجهزة_الكمبيوتر = () => {
//   const [هو_جوال، تعيين_هو_جوال] = استخدام_الحالة(false);

//   استخدام_تأثير(() => {
//     // إضافة مستمع للتغييرات في حجم الشاشة
//     const استعلام_الوسائط = نافذة.مطابقة_الوسائط("(max-width: 500px)");

//     // تعيين القيمة الأولية لمتغير الحالة `هو_جوال`
//     تعيين_هو_جوال(استعلام_الوسائط.مطابق);

//     // تعريف وظيفة رد نداء للتعامل مع تغييرات استعلام الوسائط
//     const معالجة_تغيير_استعلام_الوسائط = (حدث) => {
//       تعيين_هو_جوال(حدث.مطابق);
//     };

//     // إضافة وظيفة رد النطاق كمستمع لتغييرات استعلام الوسائط
//     استعلام_الوسائط.إضافة_حدث_مستمع("تغيير"، معالجة_تغيير_استعلام_الوسائط);

//     // إزالة المستمع عند إلغاء تركيب المكون
//     return () => {
//       استعلام_الوسائط.إزالة_حدث_مستمع("تغيير"، معالجة_تغيير_استعلام_الوسائط);
//     };
//   }, []);

//   return (
//     <كانفس
//       دورة_الإطار='حسب_الطلب'
//       ظلال
//       دقة_نقطة_الدقة={[1، 2]}
//       كاميرا={{ موقع: [20، 3، 5]، زوم_الرؤية: 25 }}
//       gl={{ احتفاظ_مخزن_الرسم: true }}
//     >
//       <تأجيل تحميل_احتياطي={<محمل_كانفس />} >
//         <تحكمات_المدار
//           تمكين_التكبير={false}
//           زاوية_قطبية_قصوى={Math.PI / 2}
//           زاوية_قطبية_صغرى={Math.PI / 2}
//         />
//         <أجهزة_الكمبيوتر هو_جوال={هو_جوال} />
//       </تأجيل>

//       <تحميل_مسبق الكل />
//     </كانفس>
//   );
// };

// تصدير_افتراضي كانفس_أجهزة_الكمبيوتر;

