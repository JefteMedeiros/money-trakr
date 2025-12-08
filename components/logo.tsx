import { Receipt } from "lucide-react";

export function Logo() {
	return (
		<div className="flex items-center gap-2">
			<Receipt className="text-purple-300" size={32} />
			<h1 className="text-xl md:text-3xl font-bold text-white">Money Trakr</h1>
		</div>
	);
}
