import React from 'react'
import IMAGES from '@/public/image';
import Image from 'next/image'
import {motion} from "framer-motion"
import { useRouter } from 'next/navigation';

const Luxury = (props) => {

    const router = useRouter()

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1, ease: "easeInOut" },
        },
      };

    return (
        <motion.div initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={sectionVariants}>
            <div className=' w-[95%] m-auto px-4 py-10'>
                <div className='flex justify-center items-center'>
                    <div className=' inline-block text-center'>
                        <h2 className='text-center font-bold text-xl lg:text-3xl text-gray-600'>{props.title}</h2>
                        <div className='border-2 w-full rounded-full mt-1 border-themeColor'>

                        </div>
                    </div>
                </div>

                <h3 className='w-full lg:w-[60%] m-auto text-center mt-8'>{props.description}</h3>

                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8 lg:mt-10'>

                    {props.luxurydata && props.luxurydata.map((e, i) => (
                        <div key={i} className='flex justify-center items-center flex-col gap-4 p-4'>
                            <div className='w-full rounded-lg h-[25vh] md:h-[18vh] lg:h-[35vh] flex justify-center items-center relative'>
                                <Image
                                    alt="Mountains"
                                    src={e.image}
                                    fill
                                    className='rounded-lg'
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>

                            <div className=' w-full grid grid-cols-2 gap-3'>
                                {e.luxurydatadescription}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </motion.div>
    )
}

export default Luxury