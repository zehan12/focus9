export type IconProps = React.HTMLAttributes<SVGElement> & {
    width?: number | string;
    height?: number | string;
    fill?: string;
    color?: string;
    onClick?: () => void;
};

export const Icons = {
    lazyMan: (props: IconProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-56 w-auto text-black sm:h-64"
            viewBox="0 0 1024 768"
            {...props}
        >
        </svg>
    )
}