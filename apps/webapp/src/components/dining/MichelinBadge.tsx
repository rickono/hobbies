import { MichelinAward } from "@rono/types";
import { FC } from "react";

const MichelinStarIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="#C1282D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.792 17.063c0 .337.057.618.057.9c0 1.8-1.238 3.037-2.982 3.037c-1.8 0-2.98-1.238-2.98-3.206v-.731c-.957.675-1.576.9-2.42.9c-1.518 0-2.925-1.463-2.925-3.094c0-1.181.844-2.194 2.082-2.756l.28-.113c-1.574-.787-2.362-1.688-2.362-2.925c0-1.687 1.294-3.094 2.925-3.094c.675 0 1.52.338 2.138.788l.281.112c0-.337-.056-.619-.056-.844C8.83 4.237 10.067 3 11.81 3c1.8 0 2.981 1.237 2.981 3.206V6.6l-.056.281c.956-.675 1.575-.9 2.419-.9c1.519 0 2.925 1.463 2.925 3.094c0 1.181-.844 2.194-2.081 2.756l-.282.169c1.575.787 2.363 1.688 2.363 2.925c0 1.688-1.294 3.094-2.925 3.094c-.675 0-1.575-.281-2.138-.788z"
    ></path>
  </svg>
);

const BibGourmandIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="#C1282D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M4.97 20c-2.395-1.947-4.763-5.245-1.005-8c-.52-4 3.442-7.5 5.524-7.5c.347-1 1.499-1.5 2.54-1.5s2.135.5 2.482 1.5c2.082 0 6.044 3.5 5.524 7.5c3.758 2.755 1.39 6.053-1.005 8"></path>
      <path d="M8 11a1 2 0 1 0 2 0a1 2 0 1 0-2 0m6 0a1 2 0 1 0 2 0a1 2 0 1 0-2 0m-6 6.085c3.5 2.712 6.5 2.712 9-1.085"></path>
      <path d="M13 18.5c.815-2.337 1.881-1.472 2-.55"></path>
    </g>
  </svg>
);

const GreenStarIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="#639E41"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M12.432 17.949c.863 1.544 2.589 1.976 4.13 1.112c1.54-.865 1.972-2.594 1.048-4.138c-.185-.309-.309-.556-.494-.74c.247.06.555.06.925.06c1.726 0 2.959-1.234 2.959-2.963s-1.233-2.965-3.02-2.965c-.37 0-.617 0-.925.062c.185-.185.308-.432.493-.74c.863-1.545.431-3.274-1.048-4.138c-1.541-.865-3.205-.433-4.13 1.111c-.185.309-.308.556-.432.803c-.123-.247-.246-.494-.431-.803c-.802-1.605-2.528-2.038-4.007-1.173c-1.541.865-1.973 2.594-1.048 4.137c.185.31.308.556.493.741c-.246-.061-.555-.061-.924-.061C4.233 8.254 3 9.489 3 11.218s1.233 2.964 3.02 2.964"></path>
      <path d="M4.073 21c4.286-2.756 5.9-5.254 7.927-9"></path>
    </g>
  </svg>
);

interface Props {
  award: MichelinAward;
}
export const MichelinBadge: FC<Props> = ({ award }) => {
  const { distinctions } = award;
  if (distinctions.length === 0) {
    return null;
  }
  const icons: [FC, string][] = [];

  if (
    distinctions.find(
      (distinction) => distinction.id === "michelin-bib-gourmand",
    )
  ) {
    icons.push([BibGourmandIcon, "bib"]);
  }
  if (
    distinctions.find((distinction) => distinction.id === "michelin-1-star")
  ) {
    icons.push([MichelinStarIcon, "star-1"]);
  }
  if (
    distinctions.find((distinction) => distinction.id === "michelin-2-star")
  ) {
    icons.push([MichelinStarIcon, "star-1"], [MichelinStarIcon, "star-2"]);
  }
  if (
    distinctions.find((distinction) => distinction.id === "michelin-3-star")
  ) {
    icons.push(
      [MichelinStarIcon, "star-1"],
      [MichelinStarIcon, "star-2"],
      [MichelinStarIcon, "star-3"],
    );
  }
  if (
    distinctions.find((distinction) => distinction.id === "michelin-green-star")
  ) {
    icons.push([GreenStarIcon, "green"]);
  }

  return (
    <div className="flex items-center h-full gap-0.5">
      {icons.map(([Icon, key]) => (
        <Icon key={key} />
      ))}
    </div>
  );
};
