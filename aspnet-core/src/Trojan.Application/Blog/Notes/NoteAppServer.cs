using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Trojan.Authorization;

namespace Trojan.Blog.Notes
{
    [AbpAuthorize(PermissionNames.Pages_Blogs_Notes)]
    public class NoteAppServer : AsyncCrudAppService<Note, NoteDto, int, GetNoteListDto, CreateNoteDto, UpdateNoteDto>, INoteAppServer
    {
        public NoteAppServer(IRepository<Note> repository) : base(repository)
        {
            
        }

        public override async Task<NoteDto> Create(CreateNoteDto input)
        {
            var note = ObjectMapper.Map<Note>(input);
            var id = await Repository.InsertAndGetIdAsync(note);
            return ObjectMapper.Map<NoteDto>(note);
        }


        public override Task Delete(EntityDto<int> input)
        {
            return base.Delete(input);
        }


        public async Task PublicNote(PublicNoteDto input)
        {
            var note = Repository.Get(input.Id);
            ObjectMapper.Map(input, note);
            var result = await Repository.UpdateAsync(note);
        }

        public override async Task<NoteDto> Update(UpdateNoteDto input)
        {
            var note = Repository.Get(input.Id);
            ObjectMapper.Map(input, note);
            var result = await Repository.UpdateAsync(note);
            return ObjectMapper.Map<NoteDto>(result);
        }



        public override async Task<PagedResultDto<NoteDto>> GetAll(GetNoteListDto input)
        {
            var data = Repository.GetAll().Where(m => !m.IsDeleted);
            data = data.WhereIf(!string.IsNullOrEmpty(input.Key), m => m.Title.Contains(input.Key) || m.Tags.Contains(input.Key));
            int count = await data.CountAsync();
            var notes = await data.OrderByDescending(q => q.CreationTime)
                .PageBy(input)
                .ToListAsync();

            
            return new PagedResultDto<NoteDto>()
            {
                TotalCount = count,
                Items = ObjectMapper.Map<List<NoteDto>>(notes)
            };
        }

        public async Task<PublicNoteDto> GetNote(EntityDto<int> input)
        {
            var note = await Repository.GetAsync(input.Id);
            return ObjectMapper.Map<PublicNoteDto>(note);
        }

    }
}
