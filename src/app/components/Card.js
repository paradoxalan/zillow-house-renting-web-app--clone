import Link from "next/link"
import ImageCard from "./ImageCard";

const Card = ({
    id,
    propName,
    slug,
    rentalPrice,
    beds,
    image
}) => {
    return (
        <Link href={`/property/${slug}`}>
            <div className="card">
                <ImageCard
                    url={image.url}
                    fileName={image.fileName}
                    width={300}
                    height={150}
                />
                <div className="text-container">
                    <h3>$ {rentalPrice} / mês</h3>
                    <h3>{beds} / quartos</h3>
                    <p>{propName}</p>

                </div>

            </div>
        </Link>
    )
}

export default Card