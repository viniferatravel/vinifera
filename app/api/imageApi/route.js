import { NextResponse } from "next/server";
import cloudinary from "@/_lib/util/cloudinary";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export async function GET(req) {
    try {
        const folder = req.nextUrl.searchParams.get('folder');

        // Fetch images from Cloudinary
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: "vinifera/" + folder,
            max_results: 500,
        });

        // console.log("Data imp::::>", result);

        const imageUrls = result.resources.map(resource => resource.secure_url);

        const imageUrlsForPackage = result.resources
            .filter(resource => !resource.public_id.includes('/places/'))
            .map(resource => resource.secure_url);

        return NextResponse.json({ success: true, results: imageUrls, resultPackage: imageUrlsForPackage }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    if (req.headers.get("content-type")?.includes("application/json")) {
        const payload = await req.json();
        // console.log("Payload: ", payload);

        if (payload.action === "delete") {
            try {
                if (!payload.publicIds || !Array.isArray(payload.publicIds)) {
                    return NextResponse.json({ success: false, error: 'Invalid public IDs' }, { status: 400 });
                }

                const deletePromises = payload.publicIds.map(publicId =>
                    cloudinary.api.delete_resources(`vinifera/${payload.folder}/${publicId}`, (error, result) => {
                        if (error) {
                            console.error(`Failed to delete ${publicId} from folder ${payload.folder}:`, error);
                        } else {
                            // console.log(`Successfully deleted ${publicId} from folder ${payload.folder}:`, result);
                        }
                    })
                );

                await Promise.all(deletePromises);

                return NextResponse.json({ success: true }, { status: 200 });
            } catch (error) {
                // console.log("Error::::::>", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }
        }
        if (payload.action === "deletePlaces") {
            try {
                if (!payload.places || !Array.isArray(payload.places)) {
                    return NextResponse.json({ success: false, error: 'Invalid places array' }, { status: 400 });
                }
        
                const deleteFilesPromises = payload.places.map(publicId =>
                    cloudinary.api.delete_resources_by_prefix(`vinifera/${payload.folder}/places/${publicId}`, (error, result) => {
                        if (error) {
                            console.error(`Failed to delete resources in ${publicId} from folder ${payload.folder}:`, error);
                        } else {
                            // console.log(`Successfully deleted resources in ${publicId} from folder ${payload.folder}:`, result);
                        }
                    })
                );
        
                await Promise.all(deleteFilesPromises);
        
                const deleteFolderPromises = payload.places.map(publicId =>
                    cloudinary.api.delete_folder(`vinifera/${payload.folder}/places/${publicId}`, (error, result) => {
                        if (error) {
                            console.error(`Failed to delete folder ${publicId} in ${payload.folder}:`, error);
                        } else {
                            // console.log(`Successfully deleted folder ${publicId} in ${payload.folder}:`, result);
                        }
                    })
                );
        
                await Promise.all(deleteFolderPromises);
        
                return NextResponse.json({ success: true }, { status: 200 });
            } catch (error) {
                // console.log("Error::::::>", error);
                return NextResponse.json({ success: false, error: error.message }, { status: 500 });
            }
        }

        if(payload.action === "rename") {
            try {
               
                const resources = await cloudinary.api.resources({
                  type: 'upload',
                  prefix: payload.oldFolderName,
                });

                // console.log('Resources:', resources.resources);

            
                for (const resource of resources.resources) {
                  const publicId = resource.public_id;
                  const newPublicId = publicId.replace(payload.oldFolderName, payload.newFolderName);
            
                  await cloudinary.uploader.rename(publicId, newPublicId);
                }
            
                await cloudinary.api.delete_resources_by_prefix(payload.oldFolderName);
            
                // console.log(`Folder renamed from ${payload.oldFolderName} to ${payload.newFolderName}`);
              } catch (error) {
                console.error('Error renaming folder:', error);
              }
        }
        

    } else if (req.headers.get("content-type")?.includes("multipart/form-data")) {
        try {
            const formData = await req.formData();
            const files = formData.getAll("files");
            const folder = formData.get("folder");
            const subfolder = formData.get("subfolder");
            const action = formData.get("action");
            const places = formData.getAll("places");
            
            
            
            if (action === "placeUpload") {
                console.log("Places:::::::>", places)
                const uploadPromises = places.map(async (place, index) => {
                    const file = files[index];
                    const buffer = await file.arrayBuffer();
                    const base64Data = Buffer.from(buffer).toString('base64');
                    const dataUri = `data:${file.type};base64,${base64Data}`;
            
                    return cloudinary.uploader.upload(dataUri, {
                        folder: `vinifera/${folder}/${subfolder}/${JSON.parse(place).name}`,
                    });
                });
            
                const results = await Promise.all(uploadPromises);

                const result = await cloudinary.api.resources({
                    type: 'upload',
                    prefix: "vinifera/" + folder,
                    max_results: 500,
                });
        
                // console.log("Data imp::::>", result);
            
                return NextResponse.json({ success: true, results}, { status: 200 });
            }else {
                const uploadPromises = files.map(async (file, index) => {
                    const buffer = await file.arrayBuffer();
                    const base64Data = Buffer.from(buffer).toString('base64');
                    const dataUri = `data:${file.type};base64,${base64Data}`;
    
                    return cloudinary.uploader.upload(dataUri, {
                        folder: "vinifera/" + folder,
                    });
                });
    
                const results = await Promise.all(uploadPromises);
    
                return NextResponse.json({ success: true, results }, { status: 200 });
            }


        } catch (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }
    }

    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
}