import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar } from './avatar'

export function SwitchImageDialog({ action, open, setValue }: { action: (img: string) => Promise<void>, open: boolean, setValue: (value: boolean) => void }) {
    return (
        <Dialog onOpenChange={setValue} open={open}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Trocar imagem</DialogTitle>
                    <DialogDescription>Escolha a imagem que mais combina com você!</DialogDescription>
                </DialogHeader>
                <div className=' flex flex-wrap gap-3'>
                {[
                    { file: 'sample.png', name: 'Nenhum' },
                    { file: 'beenie.jpg', name: 'Beenie' },
                    { file: 'delimitador.jpg', name: 'Delimitador' },
                    { file: 'deroo.jpg', name: 'Deroo' },
                    { file: 'edimon.jpg', name: 'Edimin' },
                    { file: 'hades.jpg', name: 'Hades' },
                    { file: 'mr.png', name: 'Menino R.' },
                    { file: 'tarlin.jpg', name: 'Tarlin' }
                ].map(i => (
                    <>
                    <button onClick={() => action(i.file)} style={{ all: 'unset', cursor: 'pointer' }}>
                        <Avatar data={i}/>
                    </button>
                    </>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}