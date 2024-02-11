"use client"
export function Style() {
    return (
        <style jsx global>
            {`
                header, footer {
                    display: none !important;
                }
                .rootContainer {
                    padding-top: 0px;
                }
            `}
        </style>
    )
}