import Link from "next/link";

export default function DarshBoardPage() {
    return (
        <ul className=" list-disc pl-8">
            {["hists", "chars", "subhists","hists/create", "chars/create", "subhists/create"].map(str => <li className=""><Link className=" underline text-blue-500" href={'/admin/dashboard/'+str}>{str}</Link></li>)}
        </ul>
    )
}