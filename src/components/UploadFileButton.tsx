import { Button, styled } from '@mui/material'
import { MdCloudUpload } from 'react-icons/md';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type UploadFileButtonProps = {
    accept: string,
    disabled: boolean,
    onFileChange: (event: File | null) => void
};

const UploadFileButton = ({ accept, disabled, onFileChange }: UploadFileButtonProps) => (
    <Button
        component="label"
        variant="outlined"
        disabled={disabled}
        startIcon={<MdCloudUpload />}
        sx={{
            border: '1px dashed #A3A3A3',
            borderRadius: '4px',
            width: '100%',
            minHeight: '56px',
            '&:hover': { border: '1px dashed' }
        }}>
        Upload file
        <VisuallyHiddenInput
            type="file"
            disabled={disabled}
            accept={accept}
            onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                    onFileChange(event.target.files[0]);
                } else {
                    onFileChange(null);
                }
            }} />
    </Button>

);

export default UploadFileButton;