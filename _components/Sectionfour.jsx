import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const Sectionfour = (props) => {
    const router = useRouter()
    return (
        <div>
            <div className='w-[95%] m-auto px-4 py-10 relative'>
                {/* Image Container */}
                {props.bgimage && props.bgimage.map((e, i) => (
                    <div key={i} className='w-full rounded-3xl h-[45vh] md:h-[25rem] xl:h-[25rem] relative'>
                        <Image
                            alt="Mountains"
                            src={e.image}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded-3xl"
                            style={{
                                objectFit: 'cover',
                                transform: 'scaleX(-1)',
                                objectPosition: 'top',
                            }}
                        />
                        {props.data && props.data.map((item, index) => (
                            <div key={index} className="absolute top-0 left-0 bg-black/45 w-full h-full rounded-3xl flex justify-center items-center">
                                <div className="m-5 lg:m-12 w-full h-full flex flex-col justify-evenly items-start">
                                    <div className="pl-4 border-l-3">
                                        <span className="text-lg lg:text-xl text-white font-bold">
                                            {item.heading}
                                        </span>
                                        <h2 className="text-2xl lg:text-4xl text-white font-bold">
                                            {item.subheading}
                                        </h2>
                                    </div>
                                    <div className="flex flex-col gap-1 mb-4 lg:gap-5">

                                        {item.point}
                                    </div>
                                    <div className='font-semibold'>
                                        {item.btn}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sectionfour