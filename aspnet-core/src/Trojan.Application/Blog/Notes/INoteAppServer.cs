using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Trojan.Blog.Notes
{
    public interface INoteAppServer:IAsyncCrudAppService<NoteDto,int, GetNoteListDto, CreateNoteDto,UpdateNoteDto>
    {
        Task PublicNote(PublicNoteDto input);

        Task<PublicNoteDto> GetNote(EntityDto<int> input);
    }
}
